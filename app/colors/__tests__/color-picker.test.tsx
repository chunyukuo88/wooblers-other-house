import { render, screen, fireEvent } from "@testing-library/react";
import ColorPicker from "../color-picker";
import { BackgroundColorContext } from "../../../store/background-color/context";
import {trackEvent} from "../../analytics";
import {GA_EVENTS} from "../../analytics/tracked-events";

jest.mock("../../analytics");
beforeAll(() => {
    (trackEvent as jest.Mock).mockImplementation(jest.fn());
});

const mockSetRed = jest.fn();
const mockSetGreen = jest.fn();
const mockSetBlue = jest.fn();

const defaultContextValue = {
    red: 0,
    green: 0,
    blue: 0,
    sum: 0,
    setRed: mockSetRed,
    setGreen: mockSetGreen,
    setBlue: mockSetBlue,
};

const renderWithContext = (contextValue = defaultContextValue) => {
    return render(
        <BackgroundColorContext.Provider value={contextValue}>
            <ColorPicker />
        </BackgroundColorContext.Provider>
    );
};

describe("ColorPicker", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("rendering", () => {
        it("renders the color picker section", () => {
            renderWithContext();
            expect(document.getElementById("color-picker-section")).toBeInTheDocument();
        });
        it("renders three sliders", () => {
            renderWithContext();
            const sliders = screen.getAllByRole("slider");
            expect(sliders).toHaveLength(3);
        });
        it("renders sliders with correct initial values from context", () => {
            renderWithContext({ ...defaultContextValue, red: 100, green: 150, blue: 200 });
            const sliders = screen.getAllByRole("slider");
            expect(sliders[0]).toHaveValue("100");
            expect(sliders[1]).toHaveValue("150");
            expect(sliders[2]).toHaveValue("200");
        });
        it("renders sliders with min=0 and max=255", () => {
            renderWithContext();
            const sliders = screen.getAllByRole("slider");
            sliders.forEach((slider) => {
                expect(slider).toHaveAttribute("min", "0");
                expect(slider).toHaveAttribute("max", "255");
            });
        });
        it("displays the current color values as text", () => {
            renderWithContext({ ...defaultContextValue, red: 42, green: 84, blue: 128 });
            expect(screen.getByText("42")).toBeInTheDocument();
            expect(screen.getByText("84")).toBeInTheDocument();
            expect(screen.getByText("128")).toBeInTheDocument();
        });
    });

    describe("slider interactions", () => {
        describe('WHEN: user moves the red slider', () => {
            it("THEN: persists the user's choice in the browser", () => {
                renderWithContext();
                const sliders = screen.getAllByRole("slider");

                fireEvent.change(sliders[0], { target: { value: "120" } });

                expect(mockSetRed).toHaveBeenCalledWith(120);
                expect(mockSetRed).toHaveBeenCalledTimes(1);
            });
            it("THEN: dispatches that event to the analytics provider", () => {
                renderWithContext();
                const sliders = screen.getAllByRole("slider");

                fireEvent.change(sliders[0], { target: { value: "120" } });

                expect(trackEvent).toBeCalledWith(GA_EVENTS.ADJUST_COLORS_RED);
            });
        });

        describe('WHEN: user moves the green slider', () => {
            it("THEN: persists the user's choice in the browser", () => {
                renderWithContext();
                const sliders = screen.getAllByRole("slider");
                fireEvent.change(sliders[1], { target: { value: "200" } });
                expect(mockSetGreen).toHaveBeenCalledWith(200);
                expect(mockSetGreen).toHaveBeenCalledTimes(1);
            });
            it("THEN: dispatches that event to the analytics provider", () => {
                renderWithContext();
                const sliders = screen.getAllByRole("slider");

                fireEvent.change(sliders[1], { target: { value: "120" } });

                expect(trackEvent).toBeCalledWith(GA_EVENTS.ADJUST_COLORS_GREEN);
            });
        });

        describe('WHEN: user moves the green slider', () => {
            it("THEN: persists the user's choice in the browser", () => {
                renderWithContext();
                const sliders = screen.getAllByRole("slider");
                fireEvent.change(sliders[2], { target: { value: "255" } });
                expect(mockSetBlue).toHaveBeenCalledWith(255);
                expect(mockSetBlue).toHaveBeenCalledTimes(1);
            });
            it("THEN: dispatches that event to the analytics provider", () => {
                renderWithContext();
                const sliders = screen.getAllByRole("slider");

                fireEvent.change(sliders[2], { target: { value: "120" } });

                expect(trackEvent).toBeCalledWith(GA_EVENTS.ADJUST_COLORS_BLUE);
            });
        });

        it("does not call other setters when one slider changes", () => {
            renderWithContext();
            const sliders = screen.getAllByRole("slider");
            fireEvent.change(sliders[0], { target: { value: "100" } });
            expect(mockSetGreen).not.toHaveBeenCalled();
            expect(mockSetBlue).not.toHaveBeenCalled();
        });
    });

    describe("Slider rotation styles", () => {
        it("applies correct rotation to red slider input (45deg)", () => {
            renderWithContext();
            const sliders = screen.getAllByRole("slider");
            expect(sliders[0]).toHaveStyle({ transform: "rotate(45deg)" });
        });

        it("applies correct rotation to green slider input (135deg)", () => {
            renderWithContext();
            const sliders = screen.getAllByRole("slider");
            expect(sliders[1]).toHaveStyle({ transform: "rotate(135deg)" });
        });

        it("applies correct rotation to blue slider input (180deg)", () => {
            renderWithContext();
            const sliders = screen.getAllByRole("slider");
            expect(sliders[2]).toHaveStyle({ transform: "rotate(180deg)" });
        });
    });

    describe("ConcentricCircles", () => {
        it("fills no circles when color is 0", () => {
            renderWithContext({ ...defaultContextValue, red: 0 });
            // All concentric circles for red should have no background color
            const circles = document.querySelectorAll(".woh__color-picker__concentric-circle");
            // 5 circles per Slider, red is first set of 5
            const redCircles = Array.from(circles).slice(0, 4);
            redCircles.forEach((circle) => {
                expect(circle).not.toHaveStyle({ backgroundColor: "red" });
            });
        });

        it("fills the outermost circle when color > 1", () => {
            renderWithContext({ ...defaultContextValue, red: 2 });
            const circles = document.querySelectorAll(".woh__color-picker__concentric-circle");
            // 4th circle (index 3, color > 1 threshold) should be filled
            expect(circles[3]).toHaveStyle({ backgroundColor: "red" });
            // Others should not
            expect(circles[0]).not.toHaveStyle({ backgroundColor: "red" });
            expect(circles[1]).not.toHaveStyle({ backgroundColor: "red" });
            expect(circles[2]).not.toHaveStyle({ backgroundColor: "red" });
        });

        it("fills two circles when color > 63", () => {
            renderWithContext({ ...defaultContextValue, red: 64 });
            const circles = document.querySelectorAll(".woh__color-picker__concentric-circle");
            expect(circles[2]).toHaveStyle({ backgroundColor: "red" });
            expect(circles[3]).toHaveStyle({ backgroundColor: "red" });
        });

        it("fills three circles when color > 127", () => {
            renderWithContext({ ...defaultContextValue, red: 128 });
            const circles = document.querySelectorAll(".woh__color-picker__concentric-circle");
            expect(circles[1]).toHaveStyle({ backgroundColor: "red" });
            expect(circles[2]).toHaveStyle({ backgroundColor: "red" });
            expect(circles[3]).toHaveStyle({ backgroundColor: "red" });
        });

        it("fills all four threshold circles when color > 191", () => {
            renderWithContext({ ...defaultContextValue, red: 192 });
            const circles = document.querySelectorAll(".woh__color-picker__concentric-circle");
            expect(circles[0]).toHaveStyle({ backgroundColor: "red" });
            expect(circles[1]).toHaveStyle({ backgroundColor: "red" });
            expect(circles[2]).toHaveStyle({ backgroundColor: "red" });
            expect(circles[3]).toHaveStyle({ backgroundColor: "red" });
        });

        it("innermost circle always has transparent background", () => {
            renderWithContext({ ...defaultContextValue, red: 255 });
            const circles = document.querySelectorAll(".woh__color-picker__concentric-circle");
            // The 5th circle (index 4) is always transparent
            expect(circles[4]).toHaveStyle({ backgroundColor: "transparent" });
        });

        it("renders 7 tick marks per slider (21 total)", () => {
            renderWithContext();
            const ticks = document.querySelectorAll(".woh__color-picker__tick");
            expect(ticks).toHaveLength(21);
        });

        it("applies correct border color to ticks for each channel", () => {
            renderWithContext();
            const ticks = document.querySelectorAll(".woh__color-picker__tick");
            // First 7 ticks belong to red slider
            Array.from(ticks).slice(0, 7).forEach((tick) => {
                expect(tick).toHaveStyle({ borderColor: "red" });
            });
            // Next 7 to green
            Array.from(ticks).slice(7, 14).forEach((tick) => {
                expect(tick).toHaveStyle({ borderColor: "green" });
            });
            // Last 7 to blue
            Array.from(ticks).slice(14, 21).forEach((tick) => {
                expect(tick).toHaveStyle({ borderColor: "blue" });
            });
        });
    });
});