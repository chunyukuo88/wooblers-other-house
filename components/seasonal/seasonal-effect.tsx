import {ReactNode} from "react";
import {Snowflakes} from "@/components/seasonal/snowflakes";
import {useCalendar} from "../../store/calendar/use-calendar";
import "./seasonal-effect.css";
import {Season} from "../../store/calendar/types";

export function SeasonalEffect(): ReactNode {
    const { currentSeason } = useCalendar();
    if (currentSeason === Season.Winter) {
        return <Snowflakes />
    }
    return <></>;
}