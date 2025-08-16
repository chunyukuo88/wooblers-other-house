import {ColorAction, ColorActionType} from "./types";

export const setRed = (value: number): ColorAction => ({
    type: ColorActionType.SET_RED,
    payload: value,
});

export const setBlue = (value: number): ColorAction => ({
   type: ColorActionType.SET_BLUE,
   payload: value,
});

export const setGreen = (value: number): ColorAction => ({
    type: ColorActionType.SET_GREEN,
    payload: value,
});
