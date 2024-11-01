"use client";
import React, {useContext, useEffect, useState} from "react";
import {BackgroundColorContext as context} from "../../store/background-color-context";

export default function ColorPicker(){
  const {
    updateBackgroundColor_R,
    updateBackgroundColor_G,
    updateBackgroundColor_B,
  } = useContext(context);
  const [hue_R, setHue_R] = useState<number>(255);
  const [hue_G, setHue_G] = useState<number>(255);
  const [hue_B, setHue_B] = useState<number>(255);

  useEffect(() => {
    updateBackgroundColor_R(hue_R);
  }, [hue_R]);
  useEffect(() => {
    updateBackgroundColor_G(hue_G);
  }, [hue_G]);
  useEffect(() => {
    updateBackgroundColor_B(hue_B);
  }, [hue_B]);

  const handleHueChange_R = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHue_R(Number(event.target.value));
  };
  const handleHueChange_G = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHue_G(Number(event.target.value));
  };
  const handleHueChange_B = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHue_B(Number(event.target.value));
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
          onChange={handleHueChange_R}
          style={sliderStyles}
        />
        <div>Hue: {hue_R}°</div>
      </div>
      <div className="woh_color-picker">
        <span>Green</span>
        <input
          type="range"
          min="0"
          max="255"
          value={hue_G}
          onChange={handleHueChange_G}
          style={sliderStyles}
        />
        <div>Hue: {hue_G}°</div>
      </div>
      <div className="woh_color-picker">
        <span>Blue</span>
        <input
          type="range"
          min="0"
          max="255"
          value={hue_B}
          onChange={handleHueChange_B}
          style={sliderStyles}
        />
        <div>Hue: {hue_B}°</div>
      </div>
    </>
  );
}