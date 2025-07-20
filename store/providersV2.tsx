"use client";
import {ReactNode} from "react";
import {Session} from "next-auth";
import {SessionProvider} from "next-auth/react";
import {FetchedImagesV2Provider} from "./fetched-images-context-v2";
import {CaptionColorProvider} from "./background-color-context";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {FetchedBreadContextProvider} from "./fetched-bread-context";

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
            <FetchedBreadContextProvider>
              {children}
            </FetchedBreadContextProvider>
          </FetchedImagesV2Provider>
        </CaptionColorProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};
