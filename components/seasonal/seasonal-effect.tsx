import { ReactNode } from 'react';
import { Snowflakes } from '@/components/seasonal/snowflakes';
import { useCalendar } from 'store';
import { Season } from 'store/calendar/types';
import './seasonal-effect.css';

export function SeasonalEffect(): ReactNode {
  const { currentSeason } = useCalendar();
  if (currentSeason === Season.Winter) {
    return <Snowflakes />;
  }
  return <></>;
}
