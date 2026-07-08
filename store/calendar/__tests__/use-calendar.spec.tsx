import { ReactNode } from 'react';
import { ERROR_MISSING_CONTEXT } from '../use-calendar';
import { renderHook } from '@testing-library/react';
import { Context, useCalendar } from '../context';
import { Season } from '../types';

describe('useCalendar', () => {
  describe('WHEN: the hook is used outside a context provider', () => {
    it('THEN: returns an error', () => {
      const spy = jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());

      renderHook(() => useCalendar());

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(ERROR_MISSING_CONTEXT);
    });
  });
  describe('WHEN: called within a context provider', () => {
    it('THEN: returns the current day, current date, and season', () => {
      const [day, date, season] = ['Sunday', '12-28-2025', Season.Winter];
      const calendarContextProviderProps = {
        currentDay: day,
        currentDate: date,
        currentSeason: season,
      };
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Context.Provider value={calendarContextProviderProps}>{children}</Context.Provider>
      );

      const {
        result: { current },
      } = renderHook(() => useCalendar(), { wrapper });

      expect(current!.currentDay).toEqual(day);
      expect(current!.currentDate).toEqual(date);
      expect(current!.currentSeason).toEqual(season);
    });
  });
});
