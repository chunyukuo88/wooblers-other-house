"use client";
import { Session } from "next-auth";
import {SessionProvider} from "next-auth/react";
import React from "react";

interface Children {
  children: React.ReactNode;
}

type PageProps = { session: Session | null | undefined; }

export default function Providers({children}: Children, pageProps: PageProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {children}
    </SessionProvider>
  );
};

