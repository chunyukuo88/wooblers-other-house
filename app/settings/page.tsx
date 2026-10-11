'use client';
import ColorPicker from './components/color-picker/color-picker';
import SeasonalToggle from './components/seasonal-toggle';
import CurvySlider from './components/curvy-sliders/curvy-slider';
import {
  LETTER_SLIDER_G,
  LETTER_SLIDER_J,
  LETTER_SLIDER_M,
  S_CURVE_PATH,
} from './components/curvy-sliders/slider-values';
import './page.css';

export default function Settings() {
  return (
    <div className="woh__settings-page">
      <CurvySlider svgPath={LETTER_SLIDER_G} />
    </div>
  );
}
