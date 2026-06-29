'use client';

import { ColorState, ColorAction, ColorActionType, LocalStorageColorKey } from './types';

export const initialColorState: ColorState = {
  red: 255,
  green: 255,
  blue: 255,
  sum: 765,
};

export const colorReducer = (state: ColorState, action: ColorAction): ColorState => {
  switch (action.type) {
    case ColorActionType.SET_RED: {
      const red = action.payload ?? state.red;
      return { ...state, red, sum: red + state.green + state.blue };
    }
    case ColorActionType.SET_GREEN: {
      const green = action.payload ?? state.green;
      return { ...state, green, sum: state.red + green + state.blue };
    }
    case ColorActionType.SET_BLUE: {
      const blue = action.payload ?? state.blue;
      return { ...state, blue, sum: state.red + state.green + blue };
    }
    case ColorActionType.RESET:
      return initialColorState;
    default:
      return state;
  }
};
