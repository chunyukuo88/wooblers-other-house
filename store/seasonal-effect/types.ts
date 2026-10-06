export enum SeasonalEffectType {
  TURN_ON = 'TURN_ON',
  TURN_OFF = 'TURN_OFF',
}

export interface SeasonalEffectAction {
  type: SeasonalEffectType;
  payload: boolean;
}

export type SeasonalEffectContextValue = {
  seasonalEffectIsActive: boolean;
};
