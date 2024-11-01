"use client";
import React from "react";
import {Session} from "next-auth";
import {SessionProvider} from "next-auth/react";
import {FetchedImagesProvider} from "./fetched-images-context";
import {CaptionColorProvider} from "./background-color-context";

interface Children {
  children: React.ReactNode;
}

type PageProps = { session: Session | null | undefined; }

export default function Providers({children}: Children, pageProps: PageProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <CaptionColorProvider>
        <FetchedImagesProvider>
          {children}
        </FetchedImagesProvider>
      </CaptionColorProvider>
    </SessionProvider>
  );
};
