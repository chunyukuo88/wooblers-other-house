export interface CurvySliderProps {
  knobColor: string;
  onChange: (value: number) => void;
  svgPath: string;
  valueProp: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Geometry {
  length: number;
  points: Point[];
}
