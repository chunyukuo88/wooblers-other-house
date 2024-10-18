"use client";
import {useContext, useEffect, useState} from "react";
import Image from "next/image";
import {FetchedImagesContext as context} from "../../store/fetched-images-context";
import "./scroll-to-top-button.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const target = document.createElement("div");
    target.style.height = "0px";
    target.style.width = "0px";
    document.querySelector(".woh__scroll-to-top-trigger")?.prepend(target);

    observer.observe(target);

    return () => {
      observer.disconnect();
      target.remove();
    };
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