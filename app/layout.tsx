import { ReactNode } from 'react';
import ProvidersV2 from '../store/providersV2';
import { Content } from './content';
import GoogleAnalytics from './google-analytics';
import '../styles/global.css';

interface Children {
  children: ReactNode;
}

export default async function RootLayout({ children }: Children) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">
        <ProvidersV2 session={null}>
          <Content>{children}</Content>
        </ProvidersV2>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
