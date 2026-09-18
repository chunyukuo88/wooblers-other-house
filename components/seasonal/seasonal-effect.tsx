import { ReactNode } from 'react';
import { AutumnLeaves, Snowflakes } from '@/components/seasonal';
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
  return <></>;
}
