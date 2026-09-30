import { Snowflakes } from './snowflakes';
import { AutumnLeaves } from './autumn-leaves';
import { SpringFlowers } from './spring-flowers';
import { SoccerBalls } from './soccer-balls';

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
