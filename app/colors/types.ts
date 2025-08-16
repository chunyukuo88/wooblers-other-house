import {ChangeEvent} from "react";

export type SliderProps = {
    circleFillColor: string;
    color: number;
    degrees: number;
    handler: (e: Event) => void;
}

export type Event = ChangeEvent<HTMLInputElement>;