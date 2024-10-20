"use client";
import {useContext, useEffect, useState} from "react";
import {FetchedImagesContext as context} from "../../store/fetched-images-context";
import Image from "next/image";
import "./scroll-to-top-button.css";

const ScrollToTopButton = () => {
  const {fetchedImageObjects} = useContext(context);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      }
    );
    const numberOfImages = fetchedImageObjects.length;
    const lastImage = `.woh__image-${numberOfImages - 1}`;
    const trigger = document.querySelector(lastImage)!;
    observer.observe(trigger);

    return () => observer.disconnect();
  }, [fetchedImageObjects]);

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