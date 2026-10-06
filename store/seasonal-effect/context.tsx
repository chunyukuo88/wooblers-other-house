'use client';
import { createContext, type PropsWithChildren, useContext, useReducer } from 'react';
import { SeasonalEffectContextValue } from './types';
import { seasonalEffectReducer } from './reducer';
import { turnOffSeasonalEffect, turnOnSeasonalEffect } from './actions';

interface SeasonalEffectContextShape extends SeasonalEffectContextValue {
  turnOn: () => void;
  turnOff: () => void;
}

export const initialSeasonalEffectContext = {
  seasonalEffectIsActive: true,
};

export const Context = createContext<SeasonalEffectContextShape>({
  ...initialSeasonalEffectContext,
  turnOn: () => {},
  turnOff: () => {},
});

export function SeasonalEffectProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(seasonalEffectReducer, initialSeasonalEffectContext);

  const value = {
    ...state,
    turnOn: () => dispatch(turnOnSeasonalEffect()),
    turnOff: () => dispatch(turnOffSeasonalEffect()),
  };
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

export function useSeasonalEffect() {
  return useContext(Context);
}
