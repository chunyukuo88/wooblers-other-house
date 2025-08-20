import {ChangeEvent} from "react";

export type SliderProps = {
    circleFillColor: string;
    color: number;
    degrees: number;
    handler: (e: Event) => void;
}

export type ConcentricCirclesProps = {
    color: number;
    circleFillColor: string;
}

export type Event = ChangeEvent<HTMLInputElement>;