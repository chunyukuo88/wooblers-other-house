import {render} from "@testing-library/react";
import {useCalendar} from "../../../../store/calendar/use-calendar";
import {Wooblers} from "./wooblers";

jest.mock("../../../../store/calendar/use-calendar");

describe("<Wooblers />", () => {
    describe("GIVEN: The page renders", () => {
        describe("WHEN: it is December", () => {
            it("THEN: a Santa hat appears over the W of Woobler's", () => {
                (useCalendar as jest.Mock).mockReturnValue({
                    currentDay: "",
                    currentDate: "December 31, 2025",
                    currentSeason: ""
                });
                render(<Wooblers />);

                const santaHat = document.querySelector("#santa-hat");

                expect(santaHat).toBeVisible();
            });
        });
        describe.each`
            month
            ${"November"}
            ${"January"}
            ${"February"}
            ${"March"}
        `("WHEN: it is a cold weather month but not December,", ({ month }) => {
            it("THEN: a non-Santa winter hat appears over the W of Woobler's", () => {
                (useCalendar as jest.Mock).mockReturnValue({
                    currentDay: "",
                    currentDate: `${month} 15, 2026`,
                    currentSeason: ""
                });
                render(<Wooblers />);

                const santaHat = document.querySelector("#santa-hat");
                const winterHat = document.querySelector("#winter-hat");

                expect(santaHat).toBeNull();
                expect(winterHat).toBeVisible();
            });
        });
        describe("WHEN: no adornments are to be added,", () => {
           it("THEN: renders just the word Woobler's", () => {
               (useCalendar as jest.Mock).mockReturnValue({
                   currentDay: "",
                   currentDate: "",
                   currentSeason: ""
               });
               render(<Wooblers />);

               const santaHat = document.querySelector("#santa-hat");
               const winterHat = document.querySelector("#winter-hat");

               expect(santaHat).toBeNull();
               expect(winterHat).toBeNull();
           }) ;
        });
    });
});