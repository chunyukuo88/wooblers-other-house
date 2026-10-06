'use client';
import { useSeasonalEffect } from 'store';

const SeasonalToggle = () => {
  const { turnOn, turnOff, seasonalEffectIsActive } = useSeasonalEffect();

  const toggleSeasonalEffect = () => {
    if (seasonalEffectIsActive) {
      return turnOff();
    }
    return turnOn();
  };

  const classNameButton = `woh_seasonal_toggle_button ${
    seasonalEffectIsActive ? 'woh_seasonal_toggle_button_active' : ''
  }`;
  const classNameKnob = `woh_seasonal_toggle_knob ${seasonalEffectIsActive ? 'woh_seasonal_toggle_knob_active' : ''}`;

  return (
    <div className="woh_seasonal_toggle_row">
      <label htmlFor="seasonal-toggle" className="woh_seasonal_toggle_label">
        Seasonal Effects:
      </label>
      <button id="seasonal-toggle" onClick={toggleSeasonalEffect} className={classNameButton}>
        <span className={classNameKnob}>{seasonalEffectIsActive ? 'On' : 'Off'}</span>
      </button>
    </div>
  );
};

export default SeasonalToggle;
