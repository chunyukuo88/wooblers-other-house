'use client';
import { ReactNode, useState } from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { FetchedImagesV2Provider } from './fetched-images/context';
import { CaptionColorProvider } from './background-color/context';
import { CalendarContextProvider } from './calendar/context';
import { SeasonalEffectProvider } from './seasonal-effect/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface PageProps {
  children: ReactNode;
  session: Session | null;
}

export default function Providers({ children, session }: PageProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <CaptionColorProvider>
          <FetchedImagesV2Provider>
            <SeasonalEffectProvider>
              <CalendarContextProvider>{children}</CalendarContextProvider>
            </SeasonalEffectProvider>
          </FetchedImagesV2Provider>
        </CaptionColorProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
