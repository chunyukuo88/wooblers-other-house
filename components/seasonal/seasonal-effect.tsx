import { ReactNode } from 'react';
import { AutumnLeaves, Snowflakes, SoccerBalls, SpringFlowers } from '.';
import { useCalendar, useSeasonalEffect } from 'store';
import { Season } from 'store/calendar/types';
import './seasonal-effect.css';

export function SeasonalEffect(): ReactNode {
  const { currentSeason } = useCalendar();
  const { seasonalEffectIsActive } = useSeasonalEffect();
  if (!seasonalEffectIsActive) {
    return null;
  }
  if (currentSeason === Season.Winter) {
    return <Snowflakes />;
  }
  if (currentSeason === Season.Autumn) {
    return <AutumnLeaves />;
  }
  if (currentSeason === Season.Spring) {
    return <SpringFlowers />;
  }
  if (currentSeason === Season.Summer) {
    return <SoccerBalls />;
  }
  return null;
}
