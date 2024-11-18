"use client";
import Script from "next/script"

type Props = {
  GA_MEASUREMENT_ID: string;
}

export default function GoogleAnalyticsObject({GA_MEASUREMENT_ID}: Props) {
  const script = {
    __html: `
    window.dataLayer = window.dataLayer || {};
    function gtag(){window.dataLayer.push(arguments);}
    gtag("js", new Date());
    
    gtag("config", '${GA_MEASUREMENT_ID}', {
      page_path: window.location.pathname,
    })
    `,
  }

  return (
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
  );
}