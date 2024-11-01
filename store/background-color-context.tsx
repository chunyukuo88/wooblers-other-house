"use client";
import { createContext, useState, type PropsWithChildren } from 'react';

const defaultColorInteger = 0;

export const BackgroundColorContext = createContext({
  backgroundColor: defaultColorInteger,
  updateBackgroundColor: function(colorInteger: number) {},
});

export function CaptionColorProvider(props: PropsWithChildren){
  const [color, setColor] = useState(defaultColorInteger);

  function updateTheColor(newColor: number){
    setColor(newColor);
  }

  const context = {
    backgroundColor: color,
    updateBackgroundColor: updateTheColor,
  };

  return (
    <BackgroundColorContext.Provider value={context}>
      {props.children}
    </BackgroundColorContext.Provider>
  );
}
