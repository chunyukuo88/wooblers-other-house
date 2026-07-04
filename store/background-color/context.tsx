'use client';
import { createContext, useReducer, useEffect, type PropsWithChildren, useContext } from 'react';
import { colorReducer, initialColorState } from './reducer';
import { ColorState, LocalStorageColorKey } from './types';
import { setRed, setGreen, setBlue } from './actions';

interface ColorContextShape extends ColorState {
  setRed: (value: number) => void;
  setGreen: (value: number) => void;
  setBlue: (value: number) => void;
}

export const BackgroundColorContext = createContext<ColorContextShape>({
  ...initialColorState,
  setRed: () => {},
  setGreen: () => {},
  setBlue: () => {},
});

export function CaptionColorProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(colorReducer, initialColorState);

  useEffect(() => {
    const r = parseInt(
      window.localStorage.getItem(LocalStorageColorKey.RED) || String(state.red),
      10,
    );
    const g = parseInt(
      window.localStorage.getItem(LocalStorageColorKey.GREEN) || String(state.green),
      10,
    );
    const b = parseInt(
      window.localStorage.getItem(LocalStorageColorKey.BLUE) || String(state.blue),
      10,
    );

    dispatch(setRed(r));
    dispatch(setGreen(g));
    dispatch(setBlue(b));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LocalStorageColorKey.RED, String(state.red));
    window.localStorage.setItem(LocalStorageColorKey.GREEN, String(state.green));
    window.localStorage.setItem(LocalStorageColorKey.BLUE, String(state.blue));
  }, [state.red, state.blue, state.green]);

  const value: ColorContextShape = {
    ...state,
    setRed: (v) => dispatch(setRed(v)),
    setGreen: (v) => dispatch(setGreen(v)),
    setBlue: (v) => dispatch(setBlue(v)),
  };

  return (
    <BackgroundColorContext.Provider value={value}>{children}</BackgroundColorContext.Provider>
  );
}

export function useColors() {
  return useContext(BackgroundColorContext);
}
