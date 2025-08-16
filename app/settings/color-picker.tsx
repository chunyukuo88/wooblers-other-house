"use client";
import {useContext} from "react";
import {BackgroundColorContext } from "../../store/background-color/context";
import {SliderProps, Event} from "./types"
import "./settings.css";

export default function ColorPicker() {
  const { red, green, blue, setRed, setGreen, setBlue } = useContext(BackgroundColorContext);
  const redHandler = (e: Event) => setRed(Number(e.target.value));
  const greenHandler = (e: Event) => setGreen(Number(e.target.value));
  const blueHandler = (e: Event) => setBlue(Number(e.target.value));

  return (
      <div id="color-picker-section">
          <Slider color={red} degrees={45} handler={redHandler} />
          <Slider color={green} degrees={135} handler={greenHandler} />
          <Slider color={blue} degrees={90} handler={blueHandler} />
      </div>
  );
}

function Slider(props: SliderProps) {
    const {color, degrees, handler} = props;
    const rotation = { 'transform': `rotate(${degrees}deg)` };
    return (
        <div className="woh__color-picker">
            <div className="woh__color-picker__concentric-circle" />
            <div className="woh__color-picker__concentric-circle" />
            <div className="woh__color-picker__concentric-circle" />
            <div className="woh__color-picker__concentric-circle" />
            <input
                className="woh__color-input"
                type="range"
                min="0"
                max="255"
                value={color}
                onChange={handler}
                style={rotation}
            />
            <div className="woh__color-value">{color}</div>
        </div>
    );
}
