import { ReactNode } from 'react';
import Providers from 'store/providers';
import { Content } from './content';
import GoogleAnalytics from './google-analytics';
import '../styles/global.css';
import { logger } from '../common/logging';

interface Children {
  children: ReactNode;
}

export default async function RootLayout({ children }: Children) {
  logger('🌳 RootLayout()');
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">
        <Providers session={null}>
          <Content>{children}</Content>
        </Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
