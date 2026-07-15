'use client';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { SiteTitleString } from '@/components/navigation/components/site-title-string';
import { NavBar } from '@/components/navigation/components/nav-bar';
import { BackgroundColorContext as context } from 'store/background-color/context';
import { calculateFontColor } from '../common/utils';
import { SeasonalEffect } from '@/components/seasonal/seasonal-effect';

interface Children {
  children: ReactNode;
}

export function Content({ children }: Children) {
  const { red, green, blue, sum } = useContext(context);
  const [isShrunken, setIsShrunken] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeShrunken = window.scrollY > 50;
      setIsShrunken(shouldBeShrunken);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const gradientStart = `rgb(${red}, ${green}, ${blue})`;
  const style = {
    backgroundImage: `linear-gradient(${gradientStart}, white)`,
  };
  const fontColor = calculateFontColor({ sum, red, green, blue });
  return (
    <main className="woh__site-content" style={style}>
      <SeasonalEffect />
      <SiteTitleString fontColor={fontColor} isShrunken={isShrunken} />
      <NavBar fontColor={fontColor} />
      {children}
    </main>
  );
}
