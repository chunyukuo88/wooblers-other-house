import { clamp } from '../../../../common/utils';
import { type PointerEvent, useLayoutEffect, useRef, useState } from 'react';
import { CurvySliderProps, Geometry, Point } from './types';
import './curvy-slider.css';

const SAMPLE_COUNT = 800;
const MAX_VALUE = 100;
const VIEW_BOX_PADDING = 36;
const DRAG_SEARCH_RADIUS = 0.2;
const RING_RADIUS = 24;
const KNOB_RADIUS = 14;

export default function CurvySlider(props: CurvySliderProps) {
  const { svgPath, knobColor, onChange } = props;
  const svgElementRef = useRef<SVGSVGElement>(null);
  const trackPathRef = useRef<SVGPathElement>(null);
  const isDraggingRef = useRef(false);

  const [value, setValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [viewBox, setViewBox] = useState<string | undefined>();

  const progress = value / MAX_VALUE;

  const progressRef = useRef(progress);
  progressRef.current = progress;

  useLayoutEffect(() => {
    const trackPath = trackPathRef.current;
    if (!trackPath) return;
    const pathLength = trackPath.getTotalLength();
    const sampledPoints: Point[] = [];
    for (let sampleIndex = 0; sampleIndex <= SAMPLE_COUNT; sampleIndex++) {
      const sampledPoint = trackPath.getPointAtLength((pathLength * sampleIndex) / SAMPLE_COUNT);
      sampledPoints.push({ x: sampledPoint.x, y: sampledPoint.y });
    }
    setGeometry({ length: pathLength, points: sampledPoints });

    const boundingBox = trackPath.getBBox();
    setViewBox(
      `${boundingBox.x - VIEW_BOX_PADDING} ${boundingBox.y - VIEW_BOX_PADDING} ${
        boundingBox.width + VIEW_BOX_PADDING * 2
      } ${boundingBox.height + VIEW_BOX_PADDING * 2}`,
    );
  }, [svgPath]);

  const commitValue = (nextValue: number) => {
    const roundedValue = clamp(Math.round(nextValue), 0, MAX_VALUE);
    if (roundedValue === value) return;
    setValue(roundedValue);
    onChange?.(roundedValue);
  };

  const commitProgress = (nextProgress: number) =>
    commitValue(clamp(nextProgress, 0, 1) * MAX_VALUE);

  const toSvgPoint = (pointerEvent: PointerEvent): Point | null => {
    const svgElement = svgElementRef.current;
    const screenToSvgMatrix = svgElement?.getScreenCTM();
    if (!svgElement || !screenToSvgMatrix) return null;
    const screenPoint = svgElement.createSVGPoint();
    screenPoint.x = pointerEvent.clientX;
    screenPoint.y = pointerEvent.clientY;
    const svgPoint = screenPoint.matrixTransform(screenToSvgMatrix.inverse());
    return { x: svgPoint.x, y: svgPoint.y };
  };

  const findNearestProgress = (
    targetPoint: Point,
    searchRangeStart: number,
    searchRangeEnd: number,
  ): number => {
    if (!geometry) return progressRef.current;
    const firstIndex = Math.max(0, Math.floor(searchRangeStart * SAMPLE_COUNT));
    const lastIndex = Math.min(SAMPLE_COUNT, Math.ceil(searchRangeEnd * SAMPLE_COUNT));
    let nearestIndex = firstIndex;
    let nearestSquaredDistance = Infinity;
    for (let candidateIndex = firstIndex; candidateIndex <= lastIndex; candidateIndex++) {
      const candidatePoint = geometry.points[candidateIndex];
      const squaredDistance =
        (candidatePoint.x - targetPoint.x) ** 2 + (candidatePoint.y - targetPoint.y) ** 2;
      if (squaredDistance < nearestSquaredDistance) {
        nearestSquaredDistance = squaredDistance;
        nearestIndex = candidateIndex;
      }
    }
    return nearestIndex / SAMPLE_COUNT;
  };

  const onPointerDown = (event: PointerEvent<SVGSVGElement>) => {
    const svgPoint = toSvgPoint(event);
    if (!svgPoint) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    commitProgress(findNearestProgress(svgPoint, 0, 1));
    event.preventDefault();
  };

  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!isDraggingRef.current) return;
    const svgPoint = toSvgPoint(event);
    if (!svgPoint) return;
    commitProgress(
      findNearestProgress(
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

  let knobPosition: Point | null = null;
  if (geometry) {
    const fractionalIndex = progress * SAMPLE_COUNT;
    const lowerIndex = Math.min(SAMPLE_COUNT - 1, Math.floor(fractionalIndex));
    const interpolationFactor = fractionalIndex - lowerIndex;
    const lowerPoint = geometry.points[lowerIndex];
    const upperPoint = geometry.points[lowerIndex + 1];
    knobPosition = {
      x: lowerPoint.x + (upperPoint.x - lowerPoint.x) * interpolationFactor,
      y: lowerPoint.y + (upperPoint.y - lowerPoint.y) * interpolationFactor,
    };
  }

  const className = isDragging ? 'ws ws--dragging' : 'ws';

  return (
    <>
      <svg
        ref={svgElementRef}
        className={className}
        viewBox={viewBox}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <path ref={trackPathRef} className="ws-track" d={svgPath} />
        <path
          className="ws-progress"
          d={svgPath}
          style={
            geometry
              ? {
                  stroke: knobColor || 'black',
                  strokeDasharray: `${geometry.length} ${geometry.length}`,
                  strokeDashoffset: geometry.length * (1 - progress),
                }
              : undefined
          }
        />
        <path className="ws-hit" d={svgPath} />
        <g
          className="ws-handle"
          transform={knobPosition ? `translate(${knobPosition.x} ${knobPosition.y})` : undefined}
          visibility={knobPosition ? 'visible' : 'hidden'}
        >
          <circle className="ws-ring" r={RING_RADIUS} />
          <circle style={{ fill: knobColor }} className="ws-knob" r={KNOB_RADIUS} />
        </g>
      </svg>
    </>
  );
}
