"use client";
import React, {useContext} from "react";
import SiteTitleString from "@/components/navigation/site-title-string";
import NavBar from "@/components/navigation/nav-bar";
import {BackgroundColorContext as context} from "../store/background-color-context";

interface Children {
  children: React.ReactNode;
}

export function Content({children}: Children){
  const {
    backgroundColor_R,
    backgroundColor_G,
    backgroundColor_B,
  } = useContext(context);

  const resolvedColor = `rgb(${backgroundColor_R}, ${backgroundColor_G}, ${backgroundColor_B})`;
  const style = {
    backgroundImage: `linear-gradient(${resolvedColor}, white)`
  };

  return (
    <main className="woh__site-content" style={style}>
      <SiteTitleString/>
      <NavBar/>
      {children}
    </main>
  );
}
