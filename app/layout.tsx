import React, {Suspense} from "react";
import Providers from "../store/providers";
import {Content} from "./content";
import "../styles/global.css";
import GoogleAnalytics from "./google-analytics";

interface Children {
  children: React.ReactNode;
}

const gaMeasurementId = "G-9MSJV2CGHW";

const GoogleTagManager = () => (
  <noscript>
    <iframe
      src={`https://www.googletagmanager.com/ns.html?id=${gaMeasurementId}`}
      height="0"
      width="0"
      style={{display: "none", visibility: "hidden"}}
    />
  </noscript>
)

export default async function RootLayout({children}: Children) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <Suspense fallback={null}>
        <GoogleAnalytics GA_MEASUREMENT_ID={gaMeasurementId}/>
      </Suspense>
      <body className="h-full">
        <Providers>
          <GoogleTagManager />
          <Content children={children}/>
        </Providers>
      </body>
    </html>
  );
}
