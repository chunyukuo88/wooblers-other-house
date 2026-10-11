export enum SeasonalVolumeType {
  ADJUST_VOLUME = 'ADJUST_VOLUME',
}

export interface SeasonalVolumeAction {
  type: SeasonalVolumeType;
  payload: number;
}

export type SeasonalVolumeContextValue = {
  seasonalVolume: number;
};

export const seasonalVolumeDefault = {
  seasonalVolume: 7,
};
