'use client';
import ColorPicker from './components/color-picker/color-picker';
import SeasonalToggle from './components/seasonal-toggle';
import CurvySlider from './components/curvy-slider/curvy-slider';
import './page.css';

export default function Settings() {
  return (
    <div className="woh__settings-page">
      <CurvySlider />
    </div>
  );
}
