'use client';
import CurvySlider from './components/curvy-sliders/curvy-slider';
import {
  LETTER_SLIDER_J,
  LETTER_SLIDER_G,
  LETTER_SLIDER_M,
  LETTERS_ames,
  LETTERS_ochenour,
} from './components/curvy-sliders/slider-values';
import { useColors } from 'store';
import { LetterSvg } from './components/letter-svg';
import './page.css';

export default function Settings() {
  const { red, green, blue, setRed, setGreen, setBlue } = useColors();
  // TODO: Add GTA tracking
  return (
    <div className="woh__settings-page">
      <div id="woh__settings-name__James" className="woh__settings-name__name">
        <CurvySlider
          svgPath={LETTER_SLIDER_J}
          onChange={setRed}
          knobColor={'red'}
          valueProp={red}
        />
        {LETTERS_ames.map((letter: string, index: number) => (
          <LetterSvg d={letter} animationDelay={index} />
        ))}
      </div>
      <div id="woh__settings-name__middle-initial">
        <CurvySlider
          svgPath={LETTER_SLIDER_M}
          onChange={setBlue}
          knobColor={'blue'}
          valueProp={blue}
        />
      </div>
      <div id="woh__settings-name__Gochenour" className="woh__settings-name__name">
        <CurvySlider
          svgPath={LETTER_SLIDER_G}
          onChange={setGreen}
          knobColor={'green'}
          valueProp={green}
        />
        {LETTERS_ochenour.map((letter: string, index: number) => (
          <LetterSvg d={letter} animationDelay={index} />
        ))}
      </div>
    </div>
  );
}
