import {ChangeEvent} from "react";

export type SliderProps = {
    label: string;
    color: number;
    handler: (e: Event) => void;
}

export type Event = ChangeEvent<HTMLInputElement>;