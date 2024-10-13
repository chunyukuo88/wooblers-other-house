"use client";
import { Session } from "next-auth";
import {SessionProvider} from "next-auth/react";
import React from "react";

interface Children {
  children: React.ReactNode;
}

export default function Providers({children}: Children, pageProps: { session: Session | null | undefined; } ) {
  return (
    <SessionProvider session={pageProps.session}>
      {children}
    </SessionProvider>
  );
};

