"use client";
import {createContext, type PropsWithChildren} from "react";
import {CalendarContextValue, Season} from "./types";

export const initialCalendarContext = {
    currentDay: "",
    currentDate: "",
    currentSeason: "" as Season,
};

export const CalendarContext = createContext<CalendarContextValue>(initialCalendarContext);

export function CalendarContextProvider(props: PropsWithChildren){
    const now = new Date();
    const context = {
        currentDay: now.toLocaleDateString(undefined, { weekday: "long" }),
        currentDate: now.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
        currentSeason: getCurrentSeason(now),
    };

    return (
        <CalendarContext.Provider value={context}>
            {props.children}
        </CalendarContext.Provider>
    );
}

export function getCurrentSeason(date = new Date()): Season {
    const month = date.getMonth() + 1; // 1–12
    const day = date.getDate();

    if (
        (month === 12 && day >= 21) ||
        month === 1 ||
        month === 2 ||
        (month === 3 && day < 20)
    ) {
        return Season.Winter;
    }

    if (
        (month === 3 && day >= 20) ||
        month === 4 ||
        month === 5 ||
        (month === 6 && day < 21)
    ) {
        return Season.Spring;
    }

    if (
        (month === 6 && day >= 21) ||
        month === 7 ||
        month === 8 ||
        (month === 9 && day < 23)
    ) {
        return Season.Summer;
    }

    return Season.Autumn;
}
