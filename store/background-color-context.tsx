"use client";
import {createContext, useState, type PropsWithChildren} from "react";

enum COLORS {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

const getDefaultColor = (color: string): number => {
  const storageResult = localStorage.getItem(color);
  return (storageResult)
    ? parseInt(storageResult, 10)
    : 255;
};

const defaultColorInteger_R = getDefaultColor(COLORS.RED);
const defaultColorInteger_G = getDefaultColor(COLORS.GREEN);
const defaultColorInteger_B = getDefaultColor(COLORS.BLUE);

export const BackgroundColorContext = createContext({
  backgroundColor_R: defaultColorInteger_R,
  backgroundColor_G: defaultColorInteger_G,
  backgroundColor_B: defaultColorInteger_B,
  updateBackgroundColor_R: function(colorInteger_R: number) {},
  updateBackgroundColor_G: function(colorInteger_G: number) {},
  updateBackgroundColor_B: function(colorInteger_B: number) {},
  sumOfColors: (255 * 3),
});

export function CaptionColorProvider(props: PropsWithChildren) {
  const [color_R, setColor_R] = useState(defaultColorInteger_R);
  const [color_G, setColor_G] = useState(defaultColorInteger_G);
  const [color_B, setColor_B] = useState(defaultColorInteger_B);
  const [sum, setSum] = useState((color_R + color_G + color_B));

  function updateTheColor_R(newColor_R: number){
    setColor_R(newColor_R);
    localStorage.setItem("red", newColor_R.toString());
    setSum((color_R + color_G + color_B));
  }
  function updateTheColor_G(newColor_G: number){
    setColor_G(newColor_G);
    localStorage.setItem("green", newColor_G.toString());
    setSum((color_R + color_G + color_B));
  }
  function updateTheColor_B(newColor_B: number){
    setColor_B(newColor_B);
    localStorage.setItem("blue", newColor_B.toString());
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
