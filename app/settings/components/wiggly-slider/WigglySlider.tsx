import { type KeyboardEvent, type PointerEvent, useLayoutEffect, useRef, useState } from 'react';
import './WigglySlider.css';
import { Geometry, Point, WigglySliderProps } from './types';

// Paths run bottom to top, so min is at the bottom and max is at the top.
export const WAVE_PATH = 'M150 570 A90 90 0 0 1 150 390 A90 90 0 0 0 150 210 A90 90 0 0 1 150 30';
export const S_CURVE_PATH = 'M150 570 A135 135 0 0 0 150 300 A135 135 0 0 1 150 30';

const SAMPLES = 800;

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export default function WigglySlider({
  svgPath = WAVE_PATH,
  viewBox,
  value,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label = 'Value',
  className,
}: WigglySliderProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const handleRef = useRef<SVGGElement>(null);
  const dragging = useRef(false);

  const [inner, setInner] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [autoViewBox, setAutoViewBox] = useState<string | undefined>();

  const current = clamp(value ?? inner, min, max);
  const range = max - min || 1;
  const t = (current - min) / range;

  const tRef = useRef(t);
  tRef.current = t;

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const length = el.getTotalLength();
    const points: Point[] = [];
    for (let i = 0; i <= SAMPLES; i++) {
      const p = el.getPointAtLength((length * i) / SAMPLES);
      points.push({ x: p.x, y: p.y });
    }
    setGeometry({ length, points });

    const box = el.getBBox();
    const pad = 36;
    setAutoViewBox(`${box.x - pad} ${box.y - pad} ${box.width + pad * 2} ${box.height + pad * 2}`);
  }, [svgPath]);

  const commitValue = (next: number) => {
    const snapped = Math.round((next - min) / step) * step + min;
    const v = clamp(Number(snapped.toFixed(10)), min, max);
    if (v === current) return;
    if (value === undefined) setInner(v);
    onChange?.(v);
  };

  const commitT = (nextT: number) => commitValue(min + clamp(nextT, 0, 1) * range);

  const toSvgPoint = (e: PointerEvent): Point | null => {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return null;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  };

  const nearestT = (p: Point, lo: number, hi: number): number => {
    if (!geometry) return tRef.current;
    const a = Math.max(0, Math.floor(lo * SAMPLES));
    const b = Math.min(SAMPLES, Math.ceil(hi * SAMPLES));
    let best = a;
    let bestDist = Infinity;
    for (let i = a; i <= b; i++) {
      const q = geometry.points[i];
      const d = (q.x - p.x) ** 2 + (q.y - p.y) ** 2;
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    return best / SAMPLES;
  };

  const onPointerDown = (e: PointerEvent<SVGSVGElement>) => {
    const p = toSvgPoint(e);
    if (!p) return;
    dragging.current = true;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    commitT(nearestT(p, 0, 1));
    handleRef.current?.focus({ preventScroll: true });
    e.preventDefault();
  };

  const onPointerMove = (e: PointerEvent<SVGSVGElement>) => {
    if (!dragging.current) return;
    const p = toSvgPoint(e);
    if (!p) return;
    commitT(nearestT(p, tRef.current - 0.2, tRef.current + 0.2));
  };

  const endDrag = () => {
    dragging.current = false;
    setIsDragging(false);
  };

  const onKeyDown = (e: KeyboardEvent<SVGGElement>) => {
    const page = Math.max(step, range / 10);
    let next: number | null = null;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = current + step;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = current - step;
        break;
      case 'PageUp':
        next = current + page;
        break;
      case 'PageDown':
        next = current - page;
        break;
      case 'Home':
        next = min;
        break;
      case 'End':
        next = max;
        break;
    }
    if (next !== null) {
      commitValue(next);
      e.preventDefault();
    }
  };

  let pos: Point | null = null;
  if (geometry) {
    const f = t * SAMPLES;
    const i = Math.min(SAMPLES - 1, Math.floor(f));
    const k = f - i;
    const a = geometry.points[i];
    const b = geometry.points[i + 1];
    pos = { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
  }

  const classes = ['ws', isDragging ? 'ws--dragging' : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      ref={svgRef}
      className={classes}
      viewBox={viewBox ?? autoViewBox}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <path ref={trackRef} className="ws-track" d={svgPath} />
      <path
        className="ws-progress"
        d={svgPath}
        style={
          geometry
            ? {
                strokeDasharray: `${geometry.length} ${geometry.length}`,
                strokeDashoffset: geometry.length * (1 - t),
              }
            : undefined
        }
      />
      <path className="ws-hit" d={svgPath} />
      <g
        ref={handleRef}
        className="ws-handle"
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-orientation="vertical"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        transform={pos ? `translate(${pos.x} ${pos.y})` : undefined}
        visibility={pos ? 'visible' : 'hidden'}
        onKeyDown={onKeyDown}
      >
        <circle className="ws-ring" r={24} />
        <circle className="ws-knob" r={14} />
      </g>
    </svg>
  );
}
