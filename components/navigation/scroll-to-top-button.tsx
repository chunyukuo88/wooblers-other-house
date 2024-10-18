"use client";
import {useEffect, useState} from "react";
import Image from "next/image";
import "./scroll-to-top-button.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      }
    );

    const target = document.querySelector(".woh__scroll-to-top-trigger");
    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return isVisible
    ? (<div role="button" onClick={scrollToTop} className="woh__scroll-to-top-button">
        <Image
          alt="woobler pointing"
          src="/images/woobler-pointing.png"
          width={98}
          height={102}
        />
      </div>)
    : null;
};

export default ScrollToTopButton;