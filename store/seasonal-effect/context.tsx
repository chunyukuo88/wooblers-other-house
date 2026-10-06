'use client';
import { createContext, type PropsWithChildren, useContext } from 'react';
import { SeasonalEffectContextValue } from './types';

export const initialSeasonalEffectContext = {
  seasonalEffectIsActive: true,
};

export const Context = createContext<SeasonalEffectContextValue>(initialSeasonalEffectContext);

export function SeasonalEffectProvider(props: PropsWithChildren) {
  const context = initialSeasonalEffectContext;

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
}

export function useSeasonalEffect() {
  const { seasonalEffectIsActive } = useContext(Context);

  return seasonalEffectIsActive;
}
