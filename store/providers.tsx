"use client";
import {ReactNode} from "react";
import {Session} from "next-auth";
import {SessionProvider} from "next-auth/react";
import {FetchedImagesProvider} from "./fetched-images-context";
import {CaptionColorProvider} from "./background-color-context";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

type ProvidersProps = {
  session: Session | null | undefined;
  children: ReactNode;
}

const queryClient = new QueryClient();

export default function Providers({children, session}: ProvidersProps) {
  return (
    <SessionProvider session={session}>
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
