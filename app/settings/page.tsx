'use client';
import CurvySlider from './components/curvy-sliders/curvy-slider';
import {
  LETTER_SLIDER_J,
  LETTER_SLIDER_G,
  LETTER_SLIDER_M,
  LETTERS_ames,
} from './components/curvy-sliders/slider-values';
import './page.css';
import { useColors } from 'store';
import { LetterSvg } from './components/letter-svg';

export default function Settings() {
  const { setRed, setGreen, setBlue } = useColors();
  // TODO: Add GTA tracking
  return (
    <div className="woh__settings-page">
      <div id="woh__settings-name__James" className="woh__settings-name__name">
        <CurvySlider svgPath={LETTER_SLIDER_J} onChange={setRed} knobColor={'red'} />
        {LETTERS_ames.map((letter) => (
          <LetterSvg d={letter} />
        ))}
      </div>
      <div id="woh__settings-name__Michael">
        <CurvySlider svgPath={LETTER_SLIDER_M} onChange={setBlue} knobColor={'blue'} />
      </div>
      <div id="woh__settings-name__Gochenour">
        <CurvySlider svgPath={LETTER_SLIDER_G} onChange={setGreen} knobColor={'green'} />
      </div>
    </div>
  );
}
