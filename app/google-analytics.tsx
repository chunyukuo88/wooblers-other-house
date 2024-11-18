"use client";
import Script from "next/script"
import {useEffect, useState} from "react";

type Props = {
  GA_MEASUREMENT_ID: string;
}

export default function GoogleAnalyticsObject({GA_MEASUREMENT_ID}: Props) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  const script = {
    __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
    
    gtag("config", '${GA_MEASUREMENT_ID}', {
      page_path: window.location.pathname,
    })
    `,
  }

  return initialized ? (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={script}
      />
    </>
  ) : null;
}