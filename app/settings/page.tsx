import ColorPicker from './color-picker';
import SeasonalToggle from './seasonal-toggle';
import './page.css';

export default function Settings() {
  return (
    <div className="woh__settings-page">
      <SeasonalToggle />
      <ColorPicker />
    </div>
  );
}
