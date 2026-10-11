import { SeasonalVolumeAction, SeasonalVolumeContextValue, SeasonalVolumeType } from './types';

export const seasonalVolumeReducer = (
  state: SeasonalVolumeContextValue,
  action: SeasonalVolumeAction,
) => {
  switch (action.type) {
    case SeasonalVolumeType.ADJUST_VOLUME: {
      return {
        seasonalVolume: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
