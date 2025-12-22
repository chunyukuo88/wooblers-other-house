"use client";
import {createContext, useState, type PropsWithChildren} from "react";

export const CalendarContext = createContext({
    currentDay: '',
    currentSeason: '',
    updateCalendarDay: function(day: string){},
    updateSeason: function(season: string){},
})

export function CalendarContextProvider(props: PropsWithChildren){
    const [season, setSeason] = useState<string>('');
    const [calendarDay, setCalendarDay] = useState<string>('');

    function seasonHandler(value: string){
        setSeason(value);
    }
    function calendarDayHandler(day: string){
        setCalendarDay(day);
    }

    const context = {
        updateCalendarDay: calendarDayHandler,
        currentDay: calendarDay,
        updateSeason: seasonHandler,
        currentSeason: season,
    };

    return (
        <CalendarContext.Provider value={context}>
            {props.children}
        </CalendarContext.Provider>
    );
}