'use client';
import { createContext, useReducer, useEffect, type PropsWithChildren, useContext } from 'react';
import { seasonalVolumeDefault } from './types';
import { seasonalVolumeReducer } from './reducer';
import { adjustSeasonalVolume } from './actions';

interface SeasonalVolumeContextShape {
  setVolume: (value: number) => void;
}

export const SeasonalVolumeContext = createContext<SeasonalVolumeContextShape>({
  ...seasonalVolumeDefault,
  setVolume: () => {},
});

export function SeasonalVolumeProvider({
  children,
}: PropsWithChildren<SeasonalVolumeContextShape>) {
  const [state, dispatch] = useReducer(seasonalVolumeReducer, seasonalVolumeDefault);

  useEffect(() => {
    // TODO: Obtain value from local storage and dispatch it.
  }, []);

  useEffect(() => {
    // TODO: set value in local storage whenever this changes
  }, [state.seasonalVolume]);

  const value: SeasonalVolumeContextShape = {
    ...state,
    setVolume: (newVolume: number) => dispatch(adjustSeasonalVolume(newVolume)),
  };

  return <SeasonalVolumeContext.Provider value={value}>{children}</SeasonalVolumeContext.Provider>;
}

export function useSeasonalVolume() {
  return useContext(SeasonalVolumeContext);
}
