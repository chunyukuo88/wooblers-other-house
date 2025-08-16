"use client";
import {ReactNode, useContext} from "react";
import SiteTitleString from "@/components/navigation/components/site-title-string";
import NavBar from "@/components/navigation/components/nav-bar";
import {BackgroundColorContext as context} from "../store/background-color/context";
import {calculateFontColor} from "../common/utils";

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

  return (
    <main className="woh__site-content" style={style}>
      <SiteTitleString fontColor={fontColor}/>
      <NavBar fontColor={fontColor}/>
      {children}
    </main>
  );
}
