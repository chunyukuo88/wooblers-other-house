"use client";
import React, { ChangeEvent, useContext } from "react";
import { BackgroundColorContext } from "../../store/background-color/context";
import './settings.css';

type Event = ChangeEvent<HTMLInputElement>;

export default function ColorPicker() {
  const { red, green, blue, setRed, setGreen, setBlue } = useContext(BackgroundColorContext);
  const redHandler = (e: Event) => setRed(Number(e.target.value));
  const greenHandler = (e: Event) => setGreen(Number(e.target.value));
  const blueHandler = (e: Event) => setBlue(Number(e.target.value));

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
                  value={red}
                  onChange={redHandler}
              />
              <div>Hue: {red}°</div>
          </div>
          <div className="woh__color-picker">
              <span>Green</span>
              <input
                  className="woh__color-input"
                  type="range"
                  min="0"
                  max="255"
                  value={green}
                  onChange={greenHandler}
              />
              <div>Hue: {green}°</div>
          </div>
          <div className="woh__color-picker">
              <span>Blue</span>
              <input
                  className="woh__color-input"
                  type="range"
                  min="0"
                  max="255"
                  value={blue}
                  onChange={blueHandler}
              />
              <div>Hue: {blue}°</div>
          </div>
      </div>
  );
}
