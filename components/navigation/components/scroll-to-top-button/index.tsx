"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import "../../styles/scroll-to-top-button.css";
import {trackEvent} from "../../../../app/analytics";
import {GA_EVENTS} from "../../../../app/analytics/tracked-events";

export const ScrollToTopButton = () => {


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    trackEvent(GA_EVENTS.CLICKED_WOOBLER);
  };

  return (
    <div style={{height: "0px"}} role="button" onClick={scrollToTop} data-testid={'woobler-button'} className="woh__scroll-to-top-button">
      <Image
        alt="woobler pointing"
        src="/images/woobler-pointing.png"
        width={98}
        height={102}
      />
    </div>
  )
};

export default ScrollToTopButton;