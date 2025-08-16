"use client";
import {ReactNode} from "react";
import {Session} from "next-auth";
import {SessionProvider} from "next-auth/react";
import {FetchedImagesV2Provider} from "./fetched-images-context-v2";
import {CaptionColorProvider} from "./background-color/context";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface PageProps {
  children: ReactNode;
  session: Session | null;
}

const queryClient = new QueryClient();

export default function ProvidersV2({children, session}: PageProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <CaptionColorProvider>
          <FetchedImagesV2Provider>
            {children}
          </FetchedImagesV2Provider>
        </CaptionColorProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};
