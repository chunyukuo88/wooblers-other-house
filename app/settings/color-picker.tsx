"use client";
import React, {useContext, useEffect, useState} from "react";
import {BackgroundColorContext as context, BackgroundColorContext} from "../../store/background-color-context";

export default function ColorPicker(){
  const {updateBackgroundColor} = useContext(context);
  const [hue, setHue] = useState<number>(255);

  useEffect(() => {
    updateBackgroundColor(hue);
  }, [hue]);

  const handleHueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHue(Number(event.target.value));
  };

  const sliderStyles: React.CSSProperties = {
    width: '100%',
    margin: '10px 0',
  };

  return (
    <>
      <h2>Change the Color!</h2>
      <input
        type="range"
        min="0"
        max="255"
        value={hue}
        onChange={handleHueChange}
        style={sliderStyles}
      />
      <div>Hue: {hue}°</div>
    </>
  );
}