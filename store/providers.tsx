"use client";
import {ReactNode} from "react";
import {Session} from "next-auth";
import {SessionProvider} from "next-auth/react";
import {FetchedImagesProvider} from "./fetched-images-context";
import {CaptionColorProvider} from "./background-color-context";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface PageProps {
  children: ReactNode;
  session: Session | null;
}

const queryClient = new QueryClient();

export default function Providers({children, session}: PageProps) {
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
