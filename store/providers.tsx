'use client';
import { ReactNode, useState } from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { FetchedImagesV2Provider } from './fetched-images/context';
import { CaptionColorProvider } from './background-color/context';
import { CalendarContextProvider } from './calendar/calendar-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AlbumProvider } from './album/context';

interface PageProps {
  children: ReactNode;
  session: Session | null;
}

export default function Providers({ children, session }: PageProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <AlbumProvider>
          <CaptionColorProvider>
            <FetchedImagesV2Provider>
              <CalendarContextProvider>{children}</CalendarContextProvider>
            </FetchedImagesV2Provider>
          </CaptionColorProvider>
        </AlbumProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
