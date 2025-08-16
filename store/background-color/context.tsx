"use client";
import React, { createContext, useReducer, useEffect, type PropsWithChildren } from "react";
import { colorReducer, initialColorState } from "./reducer";
import { ColorState } from "./types";
import { setRed, setGreen, setBlue } from "./actions";

interface ColorContextShape extends ColorState {
    setRed: (value: number) => void;
    setGreen: (value: number) => void;
    setBlue: (value: number) => void;
}

export const BackgroundColorContext = createContext<ColorContextShape>({
    ...initialColorState,
    setRed: () => {},
    setGreen: () => {},
    setBlue: () => {},
});

export function CaptionColorProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(colorReducer, initialColorState);

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const r = parseInt(window.localStorage.getItem("RED") || String(state.red), 10);
            const g = parseInt(window.localStorage.getItem("GREEN") || String(state.green), 10);
            const b = parseInt(window.localStorage.getItem("BLUE") || String(state.blue), 10);

            dispatch(setRed(r));
            dispatch(setGreen(g));
            dispatch(setBlue(b));
        }
    }, []);

    const value: ColorContextShape = {
        ...state,
        setRed: (v) => dispatch(setRed(v)),
        setGreen: (v) => dispatch(setGreen(v)),
        setBlue: (v) => dispatch(setBlue(v)),
    };

    return (
        <BackgroundColorContext.Provider value={value}>
            {children}
        </BackgroundColorContext.Provider>
    );
}
