import { SeasonalVolumeType } from './types';

export const adjustSeasonalVolume = (newVolume: number) => ({
  type: SeasonalVolumeType.ADJUST_VOLUME,
  payload: newVolume,
});
