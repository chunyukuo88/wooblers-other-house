export enum Season {
    Winter = "winter",
    Spring = "spring",
    Summer = "summer",
    Autumn = "autumn",
}

export type CalendarContextValue = {
    currentDay: string;
    currentDate: string;
    currentSeason: Season;
}
