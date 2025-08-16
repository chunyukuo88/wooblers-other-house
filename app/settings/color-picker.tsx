"use client";
import { ChangeEvent, useContext } from "react";
import { BackgroundColorContext } from "../../store/background-color/context";
import './settings.css';

export default function ColorPicker() {
  const { red, green, blue, setRed, setGreen, setBlue } = useContext(BackgroundColorContext);
  const redHandler = (e: Event) => setRed(Number(e.target.value));
  const greenHandler = (e: Event) => setGreen(Number(e.target.value));
  const blueHandler = (e: Event) => setBlue(Number(e.target.value));

  return (
      <div id="color-picker-section">
          <h2>Change the Color!</h2>
          <Slider label={'Red'} color={red} handler={redHandler} />
          <Slider label={'Green'} color={green} handler={greenHandler} />
          <Slider label={'Blue'} color={blue} handler={blueHandler} />
      </div>
  );
}

function Slider(props: SliderProps) {
    const {label, color, handler} = props;
    return (
        <div className="woh__color-picker">
            <span>{label}</span>
            <input
                className="woh__color-input"
                type="range"
                min="0"
                max="255"
                value={color}
                onChange={handler}
            />
            <div>Hue: {color}°</div>
        </div>
    );
}

type SliderProps = {
    label: string;
    color: number;
    handler: (e: Event) => void;
}

type Event = ChangeEvent<HTMLInputElement>;
