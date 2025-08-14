"use client";
import React, {useContext, useEffect, useState} from "react";
import {BackgroundColorContext as context} from "../../store/background-color/context";

export default function ColorPicker(){
  const {
    backgroundColor_R,
    updateBackgroundColor_R,
    backgroundColor_G,
    updateBackgroundColor_G,
    backgroundColor_B,
    updateBackgroundColor_B,
  } = useContext(context);
  const [hue_R, setHue_R] = useState<number>(backgroundColor_R);
  const [hue_G, setHue_G] = useState<number>(backgroundColor_G);
  const [hue_B, setHue_B] = useState<number>(backgroundColor_B);

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

  return (
    <div id="color-picker-section">
      <h2>Change the Color!</h2>
      <div className="woh__color-picker">
        <span>Red</span>
        <input
          className="woh__color-input"
          type="range"
          min="0"
          max="255"
          value={hue_R}
          onChange={handleHueChange_R}
        />
        <div>Hue: {hue_R}°</div>
      </div>
      <div className="woh__color-picker">
        <span>Green</span>
        <input
          className="woh__color-input"
          type="range"
          min="0"
          max="255"
          value={hue_G}
          onChange={handleHueChange_G}
        />
        <div>Hue: {hue_G}°</div>
      </div>
      <div className="woh__color-picker">
        <span>Blue</span>
        <input
          className="woh__color-input"
          type="range"
          min="0"
          max="255"
          value={hue_B}
          onChange={handleHueChange_B}
        />
        <div>Hue: {hue_B}°</div>
      </div>
    </div>
  );
}