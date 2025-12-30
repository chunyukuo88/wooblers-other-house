"use client";
import {ReactNode, useContext} from "react";
import SiteTitleString from "@/components/navigation/components/site-title-string";
import NavBar from "@/components/navigation/components/nav-bar";
import {BackgroundColorContext as context} from "../store/background-color/context";
import {calculateFontColor} from "../common/utils";
import "./content.css";

interface Children {
  children: ReactNode;
}

export function Content({children}: Children){
  const {red, green, blue, sum} = useContext(context);

  const gradientStart = `rgb(${red}, ${green}, ${blue})`;
  const style = {
    backgroundImage: `linear-gradient(${gradientStart}, white)`
  };
  const fontColor = calculateFontColor({sum, red, green, blue});
  // TODO: 按照季节开、关
  return (
    <main className="woh__site-content" style={style}>
      <Snowflakes/>
      <SiteTitleString fontColor={fontColor}/>
      <NavBar fontColor={fontColor}/>
      {children}
    </main>
  );
}

function Snowflakes(){
    const flakes = Array.from({ length: 10 }, (_, i) => i);
    return (
      <div className="woh__snowflakes" aria-hidden="true">
        {flakes.map((_: number, index: number) => (
          <div key={index} className="woh__single-snowflake">
            <div className="inner">❅</div>
          </div>
        ))}
      </div>
    );
}