'use client';
import { ReactNode } from 'react';
import { SiteTitleString } from '@/components/navigation/components/site-title-string';
import { NavBar } from '@/components/navigation/components/nav-bar';
import { useColors } from 'store/background-color/context';
import { calculateFontColor } from '../common/utils';
import { SeasonalEffect } from '@/components/seasonal/seasonal-effect';

interface Children {
  children: ReactNode;
}

export function Content({ children }: Children) {
  const { red, green, blue } = useColors();

  const sum = red + green + blue;
  const gradientStart = `rgb(${red}, ${green}, ${blue})`;
  const style = {
    backgroundImage: `linear-gradient(${gradientStart}, white)`,
  };
  const fontColor = calculateFontColor({ sum, red, green, blue });
  return (
    <main className="woh__site-content" style={style}>
      <SeasonalEffect />
      <SiteTitleString fontColor={fontColor} gradientStart={gradientStart} />
      <NavBar fontColor={fontColor} />
      {children}
    </main>
  );
}
