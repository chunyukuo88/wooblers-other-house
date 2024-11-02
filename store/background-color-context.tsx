"use client";
import {createContext, useState, type PropsWithChildren, useEffect} from "react";

enum COLORS {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

export const BackgroundColorContext = createContext({
  backgroundColor_R: 255,
  backgroundColor_G: 255,
  backgroundColor_B: 255,
  updateBackgroundColor_R: (colorInteger_R: number) => {},
  updateBackgroundColor_G: (colorInteger_G: number) => {},
  updateBackgroundColor_B: (colorInteger_B: number) => {},
  sumOfColors: 765, // 255 * 3
});

export function CaptionColorProvider(props: PropsWithChildren) {
  const [color_R, setColor_R] = useState(255);
  const [color_G, setColor_G] = useState(255);
  const [color_B, setColor_B] = useState(255);
  const [sum, setSum] = useState(765);

  const getDefaultColor = (color: string): number => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return 255;
    }
    const storageResult = window.localStorage?.getItem(color);
    return (storageResult)
      ? parseInt(storageResult, 10)
      : 255;
  };

  useEffect(() => {
    const defaultColor_R = getDefaultColor(COLORS.RED);
    const defaultColor_G = getDefaultColor(COLORS.GREEN);
    const defaultColor_B = getDefaultColor(COLORS.BLUE);

    setColor_R(defaultColor_R);
    setColor_G(defaultColor_G);
    setColor_B(defaultColor_B);
    setSum(defaultColor_R + defaultColor_G + defaultColor_B);
  }, []);

  function updateTheColor_R(newColor_R: number){
    setColor_R(newColor_R);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem("red", newColor_R.toString());
    }
    setSum((color_R + color_G + color_B));
  }
  function updateTheColor_G(newColor_G: number){
    setColor_G(newColor_G);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem("green", newColor_G.toString());
    }
    setSum((color_R + color_G + color_B));
  }
  function updateTheColor_B(newColor_B: number){
    setColor_B(newColor_B);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem("blue", newColor_B.toString());
    }
    setSum((color_R + color_G + color_B));
  }

  const context = {
    backgroundColor_R: color_R,
    backgroundColor_G: color_G,
    backgroundColor_B: color_B,
    sumOfColors: sum,
    updateBackgroundColor_R: updateTheColor_R,
    updateBackgroundColor_G: updateTheColor_G,
    updateBackgroundColor_B: updateTheColor_B,
  };

  return (
    <BackgroundColorContext.Provider value={context}>
      {props.children}
    </BackgroundColorContext.Provider>
  );
}
