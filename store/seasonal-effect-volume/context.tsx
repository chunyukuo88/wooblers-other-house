'use client';
import { createContext, useReducer, useEffect, type PropsWithChildren, useContext } from 'react';
import {
  LocalStorageVolumeKey,
  seasonalVolumeDefault,
  type SeasonalVolumeContextValue,
} from './types';
import { seasonalVolumeReducer } from './reducer';
import { adjustSeasonalVolume } from './actions';

interface SeasonalVolumeContextShape extends SeasonalVolumeContextValue {
  setVolume: (value: number) => void;
}

export const SeasonalVolumeContext = createContext<SeasonalVolumeContextShape>({
  ...seasonalVolumeDefault,
  setVolume: () => {},
});

export function SeasonalVolumeProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(seasonalVolumeReducer, seasonalVolumeDefault);

  useEffect(() => {
    const volumeFromLocalStorage = parseInt(
      window.localStorage.getItem(LocalStorageVolumeKey) || String(state.seasonalVolume),
      10,
    );
    dispatch(adjustSeasonalVolume(volumeFromLocalStorage));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LocalStorageVolumeKey, String(state.seasonalVolume));
  }, [state.seasonalVolume]);

  const value: SeasonalVolumeContextShape = {
    ...state,
    setVolume: (newVolume: number) => dispatch(adjustSeasonalVolume(newVolume)),
  };

  return <SeasonalVolumeContext.Provider value={value}>{children}</SeasonalVolumeContext.Provider>;
}

export function useSeasonalVolume() {
  const { seasonalVolume, setVolume } = useContext(SeasonalVolumeContext);
  return { seasonalVolume, setVolume };
}
