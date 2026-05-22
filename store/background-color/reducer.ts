'use client';

import { ColorState, ColorAction, ColorActionType, LocalStorageColorKey } from './types';

const MAX_INTENSITY = 255;

const colorFromLocalStorage = (colorKey: string) => {
  if (typeof window !== undefined) {
    return MAX_INTENSITY;
  }
  return parseInt(window.localStorage.getItem(colorKey) as string, 10);
};

const getInitialSumOfColors = () =>
  colorFromLocalStorage(LocalStorageColorKey.RED) +
  colorFromLocalStorage(LocalStorageColorKey.GREEN) +
  colorFromLocalStorage(LocalStorageColorKey.BLUE);

export const initialColorState: ColorState = {
  red: colorFromLocalStorage(LocalStorageColorKey.RED),
  green: colorFromLocalStorage(LocalStorageColorKey.GREEN),
  blue: colorFromLocalStorage(LocalStorageColorKey.BLUE),
  sum: getInitialSumOfColors(),
};

function persistColor(key: string, value: number) {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(key, value.toString());
  }
}

export const colorReducer = (state: ColorState, action: ColorAction): ColorState => {
  switch (action.type) {
    case ColorActionType.SET_RED: {
      const red = action.payload ?? state.red;
      persistColor(LocalStorageColorKey.RED, red);
      return { ...state, red, sum: red + state.green + state.blue };
    }
    case ColorActionType.SET_GREEN: {
      const green = action.payload ?? state.green;
      persistColor(LocalStorageColorKey.GREEN, green);
      return { ...state, green, sum: state.red + green + state.blue };
    }
    case ColorActionType.SET_BLUE: {
      const blue = action.payload ?? state.blue;
      persistColor(LocalStorageColorKey.BLUE, blue);
      return { ...state, blue, sum: state.red + state.green + blue };
    }
    case ColorActionType.RESET:
      return initialColorState;
    default:
      return state;
  }
};
