"use client";
import React, {useContext} from "react";
import SiteTitleString from "@/components/navigation/site-title-string";
import NavBar from "@/components/navigation/nav-bar";
import {BackgroundColorContext as context} from "../store/background-color-context";
import {calculateFontColor} from "../common/utils";

interface Children {
  children: React.ReactNode;
}

export function Content({children}: Children){
  const {
    backgroundColor_R: red,
    backgroundColor_G: green,
    backgroundColor_B: blue,
    sumOfColors,
  } = useContext(context);

  const gradientStart = `rgb(${red}, ${green}, ${blue})`;
  const style = {
    backgroundImage: `linear-gradient(${gradientStart}, white)`
  };
  const fontColor = calculateFontColor({sumOfColors, red, green, blue});

  return (
    <main className="woh__site-content" style={style}>
      <SiteTitleString fontColor={fontColor}/>
      <NavBar/>
      {children}
    </main>
  );
}
