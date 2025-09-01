import {ReactNode} from "react";
import ProvidersV2 from "../store/providersV2";
import {Content} from "./content";
import GoogleAnalytics from "./google-analytics";
import "../styles/global.css";

interface Children {
  children: ReactNode;
}


const gaMeasurementId = process.env.GA_MEASUREMENT_ID!;

const GoogleTagManager = () => (
  <noscript>
    <iframe
      src={`https://www.googletagmanager.com/ns.html?id=${gaMeasurementId}`}
      height="0"
      width="0"
      style={{display: "none", visibility: "hidden"}}
    />
  </noscript>
);

export default async function RootLayout({children}: Children) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <GoogleAnalytics GA_MEASUREMENT_ID={gaMeasurementId}/>
      <body className="h-full">
        <ProvidersV2 session={null}>
          <GoogleTagManager />
          <Content children={children}/>
        </ProvidersV2>
      </body>
    </html>
  );
}
