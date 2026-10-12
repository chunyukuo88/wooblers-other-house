export interface CurvySliderProps {
  className?: string;
  controlledValue?: number;
  defaultValue?: number;
  knobColor: string;
  max?: number;
  min?: number;
  label?: string;
  onChange?: (value: number) => void;
  step?: number;
  svgPath?: string;
  /** Defaults to the path's bounding box plus padding, so any path fits. */
  viewBox?: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface Geometry {
  length: number;
  points: Point[];
}
