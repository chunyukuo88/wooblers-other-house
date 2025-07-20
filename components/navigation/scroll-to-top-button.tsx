"use client";
import {useEffect, useState} from "react";
import Image from "next/image";
import "./scroll-to-top-button.css";

const ScrollToTopButton = (images: string[]) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      }
    );
    const numberOfImages = images.images.length;
    const lastImage = `.woh__image-index-${numberOfImages - 1}`;
    const trigger = document.querySelector(lastImage)!;
    if (trigger) {
      console.log('triggered!')
      observer.observe(trigger);
    }

    return () => observer.disconnect();
  }, [images]);

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