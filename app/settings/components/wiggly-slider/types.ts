export interface WigglySliderProps {
  /** SVG path `d` string describing the track. */
  svgPath?: string;
  /** Optional. Defaults to the path's bounding box plus padding, so any path fits. */
  viewBox?: string;
  /** Controlled value. Omit for an uncontrolled slider. */
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  /** Accessible name for the slider. */
  label?: string;
  className?: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface Geometry {
  length: number;
  points: Point[];
}
