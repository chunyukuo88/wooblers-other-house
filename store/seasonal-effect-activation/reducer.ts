import { SeasonalEffectAction, SeasonalEffectContextValue, SeasonalEffectType } from './types';

export const seasonalEffectReducer = (
  state: SeasonalEffectContextValue,
  action: SeasonalEffectAction,
): SeasonalEffectContextValue => {
  switch (action.type) {
    case SeasonalEffectType.TURN_ON: {
      return {
        seasonalEffectIsActive: true,
      };
    }
    case SeasonalEffectType.TURN_OFF: {
      return {
        seasonalEffectIsActive: false,
      };
    }
    default:
      return {
        seasonalEffectIsActive: true,
      };
  }
};
