import { useLayoutEffect, useRef, useState } from 'react';

const BOX_W = 80;
const BOX_H = 80;

export function LetterSvg({ d }: { d: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [viewBox, setViewBox] = useState(`0 0 ${BOX_W} ${BOX_H}`);

  useLayoutEffect(() => {
    const bbox = pathRef.current?.getBBox();
    if (!bbox) return;
    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    setViewBox(`${cx - BOX_W / 2} ${cy - BOX_H / 2} ${BOX_W} ${BOX_H}`);
  }, [d]);

  return (
    <svg className="woh__settings-name__letter" viewBox={viewBox}>
      <path ref={pathRef} d={d} />
    </svg>
  );
}
