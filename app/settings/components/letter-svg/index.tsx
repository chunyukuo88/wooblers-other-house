import { useLayoutEffect, useRef, useState } from 'react';
import './index.css';
import { LetterSvgProps } from './types';

const BOX_W = 80;
const BOX_H = 80;

export function LetterSvg(props: LetterSvgProps) {
  const { d, animationDelay } = props;
  const pathRef = useRef<SVGPathElement>(null);
  const [viewBox, setViewBox] = useState(`0 0 ${BOX_W} ${BOX_H}`);

  useLayoutEffect(() => {
    const boundingBox = pathRef.current?.getBBox();
    if (!boundingBox) return;
    const cx = boundingBox.x + boundingBox.width / 2;
    const cy = boundingBox.y + boundingBox.height / 2;
    setViewBox(`${cx - BOX_W / 2} ${cy - BOX_H / 2} ${BOX_W} ${BOX_H}`);
  }, [d]);

  const style = {
    animationDelay: `${animationDelay}s`,
  };

  return (
    <svg className="woh__settings-name__letter" viewBox={viewBox} style={style}>
      <path ref={pathRef} d={d} />
    </svg>
  );
}
