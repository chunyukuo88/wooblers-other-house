import React from "react";
import Providers from "../store/providers";
import {Content} from "./content";
import "../styles/global.css";

interface Children {
  children: React.ReactNode;
}

export default async function RootLayout({children}: Children) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">
        <Providers>
          <Content children={children}/>
        </Providers>
      </body>
    </html>
  );
}
