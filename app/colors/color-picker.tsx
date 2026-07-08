'use client';
import { useContext } from 'react';
import { BackgroundColorContext } from 'store/background-color/context';
import { ConcentricCirclesProps, Event, SliderProps } from './types';
import { trackEvent } from '../analytics';
import { GA_EVENTS } from '../analytics/tracked-events';
import './color-picker.css';

export default function ColorPicker() {
  const { red, green, blue, setRed, setGreen, setBlue } = useContext(BackgroundColorContext);
  const redHandler = (e: Event) => {
    setRed(Number(e.target.value));
    trackEvent(GA_EVENTS.ADJUST_COLORS_RED);
  };
  const greenHandler = (e: Event) => {
    setGreen(Number(e.target.value));
    trackEvent(GA_EVENTS.ADJUST_COLORS_GREEN);
  };
  const blueHandler = (e: Event) => {
    setBlue(Number(e.target.value));
    trackEvent(GA_EVENTS.ADJUST_COLORS_BLUE);
  };

  return (
    <div id="color-picker-section">
      <Slider circleFillColor={'red'} color={red} handler={redHandler} />
      <Slider circleFillColor={'green'} color={green} handler={greenHandler} />
      <Slider circleFillColor={'blue'} color={blue} handler={blueHandler} />
    </div>
  );
}

function Slider(props: SliderProps) {
  const { circleFillColor, color, handler } = props;
  const valueRotation = { transform: `rotate(${color}deg)` };
  const valueRotationInternal = {
    transform: `rotate(-${color}deg)`,
    display: 'inline-block',
  };
  return (
    <div className="woh__color-picker">
      <ConcentricCircles color={color} circleFillColor={circleFillColor} />
      <input
        className="woh__color-input"
        type="range"
        min="0"
        max="255"
        value={color}
        onChange={handler}
      />
      <div className="woh__color-value" style={valueRotation}>
        <span style={valueRotationInternal}>{color}</span>
      </div>
    </div>
  );
}

function ConcentricCircles(props: ConcentricCirclesProps) {
  const { color, circleFillColor } = props;
  return (
    <>
      <div
        className="woh__color-picker__concentric-circle"
        style={{ backgroundColor: color > 191 ? circleFillColor : '' }}
      />
      <div
        className="woh__color-picker__concentric-circle"
        style={{ backgroundColor: color > 127 ? circleFillColor : '' }}
      />
      <div
        className="woh__color-picker__concentric-circle"
        style={{ backgroundColor: color > 63 ? circleFillColor : '' }}
      />
      <div
        className="woh__color-picker__concentric-circle"
        style={{ backgroundColor: color > 1 ? circleFillColor : '' }}
      />
      <div
        className="woh__color-picker__concentric-circle"
        style={{ backgroundColor: 'transparent' }}
      />
      <div className="woh__color-picker__tick-container">
        <div className="woh__color-picker__tick" style={{ borderColor: circleFillColor }} />
        <div className="woh__color-picker__tick" style={{ borderColor: circleFillColor }} />
        <div className="woh__color-picker__tick" style={{ borderColor: circleFillColor }} />
        <div className="woh__color-picker__tick" style={{ borderColor: circleFillColor }} />
        <div className="woh__color-picker__tick" style={{ borderColor: circleFillColor }} />
        <div className="woh__color-picker__tick" style={{ borderColor: circleFillColor }} />
        <div className="woh__color-picker__tick" style={{ borderColor: circleFillColor }} />
      </div>
    </>
  );
}
