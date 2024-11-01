"use client";
import React, {useContext} from "react";
import SiteTitleString from "@/components/navigation/site-title-string";
import NavBar from "@/components/navigation/nav-bar";
import {BackgroundColorContext as context} from "../store/background-color-context";

interface Children {
  children: React.ReactNode;
}

export function Content({children}: Children){
  const {backgroundColor} = useContext(context);

  const resolvedColor = `rgb(${backgroundColor}, ${backgroundColor}, ${backgroundColor}`;

  return (
    <main className="woh__site-content" style={{ backgroundColor: resolvedColor }}>
      <SiteTitleString/>
      <NavBar/>
      {children}
    </main>
  );
}
