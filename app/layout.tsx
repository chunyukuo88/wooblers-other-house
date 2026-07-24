import { getServerSession } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/auth';
import { ReactNode } from 'react';
import Providers from 'store/providers';
import { Content } from './content';
import GoogleAnalytics from './google-analytics';
import '../styles/global.css';

interface Children {
  children: ReactNode;
}

export default async function RootLayout({ children }: Children) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">
        <Providers session={session}>
          <Content>{children}</Content>
        </Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
