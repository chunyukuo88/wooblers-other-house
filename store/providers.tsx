"use client";
import {ReactNode} from "react";
import {Session} from "next-auth";
import {SessionProvider} from "next-auth/react";
import {FetchedImagesProvider} from "./fetched-images-context";
import {CaptionColorProvider} from "./background-color-context";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface Children {
  children: ReactNode;
}

type PageProps = { session: Session | null | undefined; }

const queryClient = new QueryClient();

export default function Providers({children}: Children, pageProps: PageProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <CaptionColorProvider>
          <FetchedImagesProvider>
            {children}
          </FetchedImagesProvider>
        </CaptionColorProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};
