import { SeasonalEffectAction, SeasonalEffectType } from './types';

export const turnOnSeasonalEffect = (): SeasonalEffectAction => ({
  type: SeasonalEffectType.TURN_ON,
  payload: true,
});

export const turnOffSeasonalEffect = (): SeasonalEffectAction => ({
  type: SeasonalEffectType.TURN_OFF,
  payload: false,
});
