'use client';
import { ReactNode } from 'react';
import { DescendingObject } from '.';
import { useCalendar, useSeasonalEffect, useSeasonalVolume } from 'store';
import { Season } from 'store/calendar/types';
import './seasonal-effect.css';

export function SeasonalEffect(): ReactNode {
  const { currentSeason } = useCalendar();
  const { seasonalEffectIsActive } = useSeasonalEffect();
  const { seasonalVolume } = useSeasonalVolume();
  const volume = Math.round(seasonalVolume / 10);
  if (!seasonalEffectIsActive) {
    return null;
  }
  if (currentSeason === Season.Winter) {
    return <DescendingObject name="woh__snowflakes" numberOfDescendingObjects={volume} emoji="❅" />;
  }
  if (currentSeason === Season.Autumn) {
    return (
      <DescendingObject name="woh__autumn-leaves" numberOfDescendingObjects={volume} emoji="🍁" />
    );
  }
  if (currentSeason === Season.Spring) {
    return (
      <DescendingObject name="woh__spring-flowers" numberOfDescendingObjects={volume} emoji="🌸" />
    );
  }
  if (currentSeason === Season.Summer) {
    return (
      <DescendingObject name="woh__soccer-balls" numberOfDescendingObjects={volume} emoji="⚽" />
    );
  }
  return null;
}
