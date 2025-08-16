import { ColorState, ColorAction, ColorActionType } from "./types";
import {COLOR_LABELS} from "../types";

const MAX_INTENSITY = 255;

export const initialColorState: ColorState = {
    red: MAX_INTENSITY,
    green: MAX_INTENSITY,
    blue: MAX_INTENSITY,
    sum: MAX_INTENSITY * 3,
};

function persistColor(key: string, value: number) {
    if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value.toString());
    }
}

export const colorReducer = (state: ColorState, action: ColorAction): ColorState => {
    switch (action.type) {
        case ColorActionType.SET_RED: {
            const red = action.payload ?? state.red;
            persistColor(COLOR_LABELS.RED, red);
            return { ...state, red, sum: red + state.green + state.blue };
        }
        case ColorActionType.SET_GREEN: {
            const green = action.payload ?? state.green;
            persistColor(COLOR_LABELS.GREEN, green);
            return { ...state, green, sum: state.red + green + state.blue };
        }
        case ColorActionType.SET_BLUE: {
            const blue = action.payload ?? state.blue;
            persistColor(COLOR_LABELS.BLUE, blue);
            return { ...state, blue, sum: state.red + state.green + blue };
        }
        case ColorActionType.RESET:
            return initialColorState;
        default:
            return state;
    }
};
