import { ReactNode } from 'react';
import { AutumnLeaves, Snowflakes, SoccerBalls, SpringFlowers } from '.';
import { useCalendar } from 'store';
import { Season } from 'store/calendar/types';
import './seasonal-effect.css';

export function SeasonalEffect(): ReactNode {
  const { currentSeason } = useCalendar();
  if (currentSeason === Season.Winter) {
    return <Snowflakes />;
  }
  if (currentSeason === Season.Autumn) {
    return <AutumnLeaves />;
  }
  if (currentSeason === Season.Spring) {
    return <SpringFlowers />;
  }
  if (currentSeason === 'Summer') {
    return <SoccerBalls />;
  }
  return null;
}
