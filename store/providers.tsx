"use client";
import React from "react";
import { Session } from "next-auth";
import {SessionProvider} from "next-auth/react";
import {FetchedImagesProvider} from "./fetched-images-context";

interface Children {
  children: React.ReactNode;
}

type PageProps = { session: Session | null | undefined; }

export default function Providers({children}: Children, pageProps: PageProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <FetchedImagesProvider>
        {children}
      </FetchedImagesProvider>
    </SessionProvider>
  );
};

