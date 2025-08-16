"use client";
import {useContext} from "react";
import {BackgroundColorContext } from "../../store/background-color/context";
import {SliderProps, Event} from "./types";
import "./color-picker.css";

export default function ColorPicker() {
    const { red, green, blue, setRed, setGreen, setBlue } = useContext(BackgroundColorContext);
    const redHandler = (e: Event) => setRed(Number(e.target.value));
    const greenHandler = (e: Event) => setGreen(Number(e.target.value));
    const blueHandler = (e: Event) => setBlue(Number(e.target.value));

    return (
        <div id="color-picker-section">
            <Slider circleFillColor={"red"} color={red} degrees={45} handler={redHandler} />
            <Slider circleFillColor={"green"} color={green} degrees={135} handler={greenHandler} />
            <Slider circleFillColor={"blue"} color={blue} degrees={90} handler={blueHandler} />
        </div>
    );
}

function Slider(props: SliderProps) {
    const {circleFillColor, color, degrees, handler} = props;
    const inputRotation = { 'transform': `rotate(${degrees}deg)` };
    const valueRotation = { 'transform': `rotate(${color}deg)` };
    const valueRotationInternal = {
        transform: `rotate(-${color}deg)`,
        display: 'inline-block'
    };
    return (
        <div className="woh__color-picker">
            <div className="woh__color-picker__concentric-circle" style={{ backgroundColor: color > 191 ? circleFillColor : '' }}/>
            <div className="woh__color-picker__concentric-circle" style={{ backgroundColor: color > 127 ? circleFillColor : '' }}/>
            <div className="woh__color-picker__concentric-circle" style={{ backgroundColor: color > 63 ? circleFillColor : '' }}/>
            <div className="woh__color-picker__concentric-circle" style={{ backgroundColor: color > 1 ? circleFillColor : '' }}/>
            <input
                className="woh__color-input"
                type="range"
                min="0"
                max="255"
                value={color}
                onChange={handler}
                style={inputRotation}
            />
            <div className="woh__color-value" style={valueRotation}>
                <span style={valueRotationInternal}>{color}</span>
            </div>
        </div>
    );
}