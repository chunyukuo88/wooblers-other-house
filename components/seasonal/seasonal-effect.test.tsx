import {useCalendar} from "../../store/calendar/use-calendar";
import {Season} from "../../store/calendar/types";
import {render} from "@testing-library/react";
import {SeasonalEffect} from "@/components/seasonal/seasonal-effect";

jest.mock("../../store/calendar/use-calendar");

describe("<SeasonalEffect />", () => {
    describe("GIVEN: season is not available", () => {
        describe("WHEN: the page loads", () => {
            test("THEN: user sees no seasonal effects", () => {
                (useCalendar as jest.Mock).mockReturnValue({
                    currentDay: "",
                    currentDate: "",
                    currentSeason: "",
                });

                render(<SeasonalEffect />);

                const snowflakes = document.querySelector(".woh__snowflakes");

                expect(snowflakes).toBeNull();
            });
        });
    });
    describe("GIVEN: it is winter", () => {
        describe("WHEN: the page loads", () => {
            test("THEN: user sees snowflakes", () => {
                (useCalendar as jest.Mock).mockReturnValue({
                    currentDay: "",
                    currentDate: "",
                    currentSeason: Season.Winter,
                });
    
                render(<SeasonalEffect />);
    
                const snowflakes = document.querySelector(".woh__snowflakes");
    
                expect(snowflakes).toBeVisible();
            });
        });
    });
});