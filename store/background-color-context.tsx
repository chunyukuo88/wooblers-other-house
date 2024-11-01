"use client";
import { createContext, useState, type PropsWithChildren } from 'react';

const defaultColor = "rgb(255, 255, 255)";

export const BackgroundColorContext = createContext({
  backgroundColor: defaultColor,
  updateBackgroundColor: function(color: string) {},
});

export function CaptionColorProvider(props: PropsWithChildren){
  const [color, setColor] = useState<string>(defaultColor);

  function updateTheColor(newColor: string){
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
