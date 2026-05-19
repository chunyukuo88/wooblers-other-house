"use client";
import Script from "next/script"

export default function GoogleAnalyticsObject() {
  if (process.env.NODE_ENV !== "production") {
      return null;
  }
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!;

  const script = {
    __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
    
    gtag("config", '${gaMeasurementId}')`,
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={script}
      />
    </>
  );
}