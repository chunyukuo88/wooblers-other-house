export interface CurvySliderProps {
  controlledValue?: number;
  defaultValue?: number;
  knobColor: string;
  onChange: (value: number) => void;
  svgPath?: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface Geometry {
  length: number;
  points: Point[];
}
