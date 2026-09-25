import { Season } from '../../../store/calendar/types';
import { render } from '@testing-library/react';
import { SeasonalEffect } from '@/components/seasonal/seasonal-effect';
import { useCalendar } from '../../../store';

jest.mock('../../../store');

describe('<SeasonalEffect />', () => {
  describe('GIVEN: it is spring', () => {
    describe('WHEN: the page loads', () => {
      it('THEN: user sees snowflakes (same as winter)', () => {
        (useCalendar as jest.Mock).mockReturnValueOnce({
          currentDay: '',
          currentDate: '',
          currentSeason: Season.Spring,
        });

        render(<SeasonalEffect />);

        const snowflakes = document.querySelector('.woh__spring-flowers');

        expect(snowflakes).toBeVisible();
      });
    });
  });
  describe('GIVEN: season is not available', () => {
    describe('WHEN: the page loads', () => {
      it('THEN: user sees no seasonal effects', () => {
        (useCalendar as jest.Mock).mockReturnValue({
          currentDay: '',
          currentDate: '',
          currentSeason: '',
        });

        render(<SeasonalEffect />);

        const snowflakes = document.querySelector('.woh__snowflakes');

        expect(snowflakes).toBeNull();
      });
    });
  });
  describe('GIVEN: it is winter', () => {
    describe('WHEN: the page loads', () => {
      it('THEN: user sees snowflakes', () => {
        (useCalendar as jest.Mock).mockReturnValueOnce({
          currentDay: '',
          currentDate: '',
          currentSeason: Season.Winter,
        });

        render(<SeasonalEffect />);

        const snowflakes = document.querySelector('.woh__snowflakes');

        expect(snowflakes).toBeVisible();
      });
    });
  });
  describe('GIVEN: it is autumn', () => {
    describe('WHEN: the page loads', () => {
      it('THEN: user sees falling leaves', () => {
        (useCalendar as jest.Mock).mockReturnValueOnce({
          currentDay: '',
          currentDate: '',
          currentSeason: Season.Autumn,
        });

        render(<SeasonalEffect />);

        const leaves = document.querySelector('.woh__autumn-leaves');

        expect(leaves).toBeVisible();
      });
    });
  });
  describe('GIVEN: it is summer', () => {
    describe('WHEN: the page loads', () => {
      it('THEN: user sees no seasonal effects (same as empty)', () => {
        (useCalendar as jest.Mock).mockReturnValueOnce({
          currentDay: '',
          currentDate: '',
          currentSeason: Season.Summer,
        });

        render(<SeasonalEffect />);

        const effectElement = document.querySelector('.woh__snowflakes, .woh__autumn-leaves');

        expect(effectElement).toBeNull();
      });
    });
  });
  describe('GIVEN: it is spring', () => {
    describe('WHEN: the page loads', () => {
      it('THEN: user sees flowers (same as autumn)', () => {
        (useCalendar as jest.Mock).mockReturnValueOnce({
          currentDay: '',
          currentDate: '',
          currentSeason: Season.Spring,
        });

        render(<SeasonalEffect />);

        const flowers = document.querySelector('.woh__spring-flowers');

        expect(flowers).toBeVisible();
      });
    });
  });
  describe('WHEN: the page loads', () => {
    it('THEN: user sees no seasonal effects (same as empty)', () => {
      (useCalendar as jest.Mock).mockReturnValueOnce({
        currentDay: '',
        currentDate: '',
        currentSeason: Season.Summer,
      });

      render(<SeasonalEffect />);

      const effectElement = document.querySelector('.woh__snowflakes, .woh__autumn-leaves');

      expect(effectElement).toBeNull();
    });
  });
});
