'use client';
import ColorPicker from './components/color-picker/color-picker';
import SeasonalToggle from './components/seasonal-toggle';
import CurvySlider from './components/curvy-sliders/curvy-slider';
import {
  LETTER_SLIDER_J,
  LETTER_SLIDER_G,
  LETTER_SLIDER_M,
  S_CURVE_PATH,
} from './components/curvy-sliders/slider-values';
import './page.css';
import { useColors, useSeasonalVolume } from '../../store';

export default function Settings() {
  const { setRed, setGreen, setBlue } = useColors();
  // TODO: Add GTA tracking
  return (
    <div className="woh__settings-page">
      <CurvySlider svgPath={S_CURVE_PATH} knobColor={'black'} />
      <CurvySlider svgPath={LETTER_SLIDER_J} onChange={setRed} knobColor={'red'} />
      <CurvySlider svgPath={LETTER_SLIDER_G} onChange={setGreen} knobColor={'green'} />
      <CurvySlider svgPath={LETTER_SLIDER_M} onChange={setBlue} knobColor={'blue'} />
    </div>
  );
}
