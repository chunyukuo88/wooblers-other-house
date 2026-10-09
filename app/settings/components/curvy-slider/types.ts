export interface CurvySliderProps {
  svgPath?: string;
  /** Defaults to the path's bounding box plus padding, so any path fits. */
  viewBox?: string;
  controlledValue?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
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
