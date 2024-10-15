"use client";
import {useEffect, useState} from "react";
import "./scroll-to-top-button.css";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const target = document.createElement("div");
    target.style.height = "1px";
    document.body.prepend(target);

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
    ? (<button onClick={scrollToTop} className="woh__scroll-to-top-button">
        ↑
      </button>)
    : null;
};

export default BackToTopButton;