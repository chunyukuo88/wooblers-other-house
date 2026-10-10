'use client';
import { useColors } from 'store';
import { calculateFontColor } from '../../../../common/utils';
import './go-home.css';

export const GoHome = () => {
  const { red, green, blue } = useColors();
  const sum = red + green + blue;
  const fontColor = calculateFontColor({ sum, red, green, blue });

  return (
    <span style={{ color: fontColor }} id="woh__go-home-cta">
      → So click here to go home. ←
    </span>
  );
};
