"use client";
import {createContext, useState, type PropsWithChildren} from 'react';

const defaultColorInteger_R = 255;
const defaultColorInteger_G = 255;
const defaultColorInteger_B = 255;

export const BackgroundColorContext = createContext({
  backgroundColor_R: defaultColorInteger_R,
  backgroundColor_G: defaultColorInteger_G,
  backgroundColor_B: defaultColorInteger_B,
  updateBackgroundColor_R: function(colorInteger_R: number) {},
  updateBackgroundColor_G: function(colorInteger_G: number) {},
  updateBackgroundColor_B: function(colorInteger_B: number) {},
});

export function CaptionColorProvider(props: PropsWithChildren){
  const [color_R, setColor_R] = useState(defaultColorInteger_R);
  const [color_G, setColor_G] = useState(defaultColorInteger_G);
  const [color_B, setColor_B] = useState(defaultColorInteger_B);

  function updateTheColor_R(newColor_R: number){
    setColor_R(newColor_R);
  }
  function updateTheColor_G(newColor_G: number){
    setColor_G(newColor_G);
  }
  function updateTheColor_B(newColor_B: number){
    setColor_B(newColor_B);
  }

  const context = {
    backgroundColor_R: color_R,
    backgroundColor_G: color_G,
    backgroundColor_B: color_B,
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
