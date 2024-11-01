"use client";
import React, {useContext, useEffect, useState} from "react";
import {BackgroundColorContext as context} from "../../store/background-color-context";

export default function ColorPicker(){
  const {updateBackgroundColor_R} = useContext(context);
  const [hue_R, setHue_R] = useState<number>(255);

  useEffect(() => {
    updateBackgroundColor_R(hue_R);
  }, [hue_R]);

  const handleHueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHue_R(Number(event.target.value));
  };

  const sliderStyles: React.CSSProperties = {
    width: '100%',
    margin: '10px 0',
  };

  return (
    <>
      <h2>Change the Color!</h2>
      <div className="woh_color-picker">
        <span>Red</span>
        <input
          type="range"
          min="0"
          max="255"
          value={hue_R}
          onChange={handleHueChange}
          style={sliderStyles}
        />
      </div>
      <div>Hue: {hue_R}°</div>
    </>
  );
}