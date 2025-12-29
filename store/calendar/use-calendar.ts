import {CalendarContext} from './calendar-context';
import {useContext} from "react";

export function useCalendar() {
    const context = useContext(CalendarContext);
    if (!context) {
        const { error } = console;
        error(ERROR_MISSING_CONTEXT);
        return;
    }
    const {currentDay, currentDate, currentSeason} = context;
    return {currentDay, currentDate, currentSeason};
}

export const ERROR_MISSING_CONTEXT = "useCalendar() must be called inside its context provider.";