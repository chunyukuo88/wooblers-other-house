import {ReactNode} from "react";
import {Snowflakes} from "@/components/seasonal/snowflakes";
import {useCalendar} from "../../store/calendar/use-calendar";
import "./seasonal-effect.css";

export function SeasonalEffect(): ReactNode {
    const { currentSeason } = useCalendar();
    if (!currentSeason) {
        return <></>;
    }
    return <Snowflakes />
}