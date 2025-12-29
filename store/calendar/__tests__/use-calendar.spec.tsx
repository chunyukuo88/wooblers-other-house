import {MISSING_CONTEXT, useCalendar} from "../use-calendar"
import { renderHook } from "@testing-library/react";
import {CalendarContext, CalendarContextProvider} from "../calendar-context";
import {Season} from "../types";

describe("useCalendar", () => {
    describe("WHEN: the hook is used outside a context provider", () => {
        it("THEN: returns an error", () => {
            const spy = jest.spyOn(console, "error");

            renderHook(() => useCalendar())

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(MISSING_CONTEXT);
        });
    });
    describe("WHEN: called within a context provider", () => {
        it("THEN: returns the current day, current date, and season", () => {
           const calendarContextProviderProps = {
               currentDay: "",
               currentDate: "",
               currentSeason: Season.Winter,
           };
            const wrapper = () => (
             <CalendarContext.Provider value={calendarContextProviderProps}>
                 <div></div>
             </CalendarContext.Provider>
           );

            const {result} = renderHook(() => useCalendar(), { wrapper });

            expect(result.current?.currentDate).toEqual("");
        });
    });
});
