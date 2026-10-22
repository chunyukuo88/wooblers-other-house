import { clamp } from '../../../../common/utils';
import { CSSProperties, type PointerEvent, useLayoutEffect, useRef, useState } from 'react';
import { CurvySliderProps, Geometry, Point } from './types';
import {
  DRAG_SEARCH_RADIUS,
  KNOB_RADIUS,
  MAX_VALUE,
  RING_RADIUS,
  SAMPLE_COUNT,
  VIEW_BOX_PADDING,
} from './constants';
import './curvy-slider.css';

export default function CurvySlider(props: CurvySliderProps) {
  const { svgPath, knobColor, onChange, valueProp } = props;
  const trackPathRef = useRef<SVGPathElement>(null);
  const isDraggingRef = useRef(false);

  const [value, setValue] = useState(valueProp);
  const [isDragging, setIsDragging] = useState(false);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [viewBox, setViewBox] = useState<string | undefined>();

  const progress = value / MAX_VALUE;
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useLayoutEffect(() => {
    const trackPath = trackPathRef.current;
    if (!trackPath) return;
    setGeometry(sampleTrackPath(trackPath));
    setViewBox(computeViewBox(trackPath));
  }, [svgPath]);

  const commitValue = (nextValue: number) => {
    const roundedValue = clamp(Math.round(nextValue), 0, MAX_VALUE);
    if (roundedValue === value) return;
    setValue(roundedValue);
    onChange?.(roundedValue);
  };

  const commitProgress = (nextProgress: number) =>
    commitValue(clamp(nextProgress, 0, 1) * MAX_VALUE);

  const onPointerDown = (event: PointerEvent<SVGSVGElement>) => {
    const svgPoint = convertPointerToSvgPoint(event.currentTarget, event);
    if (!svgPoint || !geometry) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    commitProgress(findNearestProgress(geometry.points, svgPoint, 0, 1));
    event.preventDefault();
  };

  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!isDraggingRef.current || !geometry) return;
    const svgPoint = convertPointerToSvgPoint(event.currentTarget, event);
    if (!svgPoint) return;
    commitProgress(
      findNearestProgress(
        geometry.points,
        svgPoint,
        progressRef.current - DRAG_SEARCH_RADIUS,
        progressRef.current + DRAG_SEARCH_RADIUS,
      ),
    );
  };

  const endDrag = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const knobPosition = geometry ? interpolateKnobPosition(geometry.points, progress) : null;
  const knobTransform = knobPosition ? computeKnobTransform(knobPosition) : undefined;
  const progressStrokeStyle = geometry
    ? computeProgressStroke(geometry, progress, knobColor)
    : undefined;
  const className = isDragging ? 'ws ws--dragging' : 'ws';

  return (
    <svg
      className={className}
      viewBox={viewBox}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{ visibility: viewBox ? 'visible' : 'hidden' }}
    >
      <path ref={trackPathRef} className="ws-track" d={svgPath} />
      <path className="ws-progress" d={svgPath} style={progressStrokeStyle} />
      <path className="ws-hit" d={svgPath} />
      <g
        className="ws-handle"
        transform={knobTransform}
        visibility={knobPosition ? 'visible' : 'hidden'}
      >
        <circle className="ws-ring" r={RING_RADIUS} />
        <circle style={{ fill: knobColor }} className="ws-knob" r={KNOB_RADIUS} />
      </g>
    </svg>
  );
}

function computeKnobTransform(knobPosition: Point): string {
  return `translate(${knobPosition.x} ${knobPosition.y})`;
}

function computeProgressStroke(
  geometry: Geometry,
  progress: number,
  color: string | undefined,
): CSSProperties {
  return {
    stroke: color || 'black',
    strokeDasharray: `${geometry.length} ${geometry.length}`,
    strokeDashoffset: geometry.length * (1 - progress),
  };
}

function sampleTrackPath(trackPath: SVGPathElement): Geometry {
  const length = trackPath.getTotalLength();
  const points: Point[] = [];
  for (let sampleIndex = 0; sampleIndex <= SAMPLE_COUNT; sampleIndex++) {
    const sampledPoint = trackPath.getPointAtLength((length * sampleIndex) / SAMPLE_COUNT);
    points.push({ x: sampledPoint.x, y: sampledPoint.y });
  }
  return { length, points };
}

function computeViewBox(trackPath: SVGPathElement): string {
  const boundingBox = trackPath.getBBox();
  const left = boundingBox.x - VIEW_BOX_PADDING;
  const top = boundingBox.y - VIEW_BOX_PADDING;
  const width = boundingBox.width + VIEW_BOX_PADDING * 2;
  const height = boundingBox.height + VIEW_BOX_PADDING * 2;
  return `${left} ${top} ${width} ${height}`;
}

function convertPointerToSvgPoint(
  svgElement: SVGSVGElement,
  pointerEvent: PointerEvent<SVGSVGElement>,
): Point | null {
  const screenToSvgMatrix = svgElement.getScreenCTM();
  if (!screenToSvgMatrix) return null;
  const screenPoint = svgElement.createSVGPoint();
  screenPoint.x = pointerEvent.clientX;
  screenPoint.y = pointerEvent.clientY;
  const svgPoint = screenPoint.matrixTransform(screenToSvgMatrix.inverse());
  return { x: svgPoint.x, y: svgPoint.y };
}

function findNearestProgress(
  sampledPoints: Point[],
  targetPoint: Point,
  searchRangeStart: number,
  searchRangeEnd: number,
): number {
  const firstIndex = Math.max(0, Math.floor(searchRangeStart * SAMPLE_COUNT));
  const lastIndex = Math.min(SAMPLE_COUNT, Math.ceil(searchRangeEnd * SAMPLE_COUNT));
  let nearestIndex = firstIndex;
  let nearestSquaredDistance = Infinity;
  for (let candidateIndex = firstIndex; candidateIndex <= lastIndex; candidateIndex++) {
    const candidatePoint = sampledPoints[candidateIndex];
    const squaredDistance =
      (candidatePoint.x - targetPoint.x) ** 2 + (candidatePoint.y - targetPoint.y) ** 2;
    if (squaredDistance < nearestSquaredDistance) {
      nearestSquaredDistance = squaredDistance;
      nearestIndex = candidateIndex;
    }
  }
  return nearestIndex / SAMPLE_COUNT;
}

function interpolateKnobPosition(sampledPoints: Point[], progress: number): Point {
  const fractionalIndex = progress * SAMPLE_COUNT;
  const lowerIndex = Math.min(SAMPLE_COUNT - 1, Math.floor(fractionalIndex));
  const interpolationFactor = fractionalIndex - lowerIndex;
  const lowerPoint = sampledPoints[lowerIndex];
  const upperPoint = sampledPoints[lowerIndex + 1];
  return {
    x: lowerPoint.x + (upperPoint.x - lowerPoint.x) * interpolationFactor,
    y: lowerPoint.y + (upperPoint.y - lowerPoint.y) * interpolationFactor,
  };
}
