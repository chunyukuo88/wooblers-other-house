'use client';
import ColorPicker from './components/color-picker';
import SeasonalToggle from './components/seasonal-toggle';
import './page.css';
import WigglySlider from './components/WigglySlider';

export default function Settings() {
  return (
    <div className="woh__settings-page">
      <WigglySlider />
    </div>
  );
}
