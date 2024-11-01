"use client";
import {createContext, useState, type PropsWithChildren} from 'react';

const defaultColorInteger_R = 255;

export const BackgroundColorContext = createContext({
  backgroundColor_R: defaultColorInteger_R,
  updateBackgroundColor_R: function(colorInteger_R: number) {},
});

export function CaptionColorProvider(props: PropsWithChildren){
  const [color_R, setColor_R] = useState(defaultColorInteger_R);

  function updateTheColor_R(newColor_R: number){
    setColor_R(newColor_R);
  }

  const context = {
    backgroundColor_R: color_R,
    updateBackgroundColor_R: updateTheColor_R,
  };

  return (
    <BackgroundColorContext.Provider value={context}>
      {props.children}
    </BackgroundColorContext.Provider>
  );
}
