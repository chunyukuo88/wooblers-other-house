import Providers from "../components/SessionProvider";
import "../styles/global.css";
import NavBar from "@/components/navigation/nav-bar";
import SiteTitleString from "@/components/navigation/site-title-string";

interface Children {
  children: React.ReactNode;
}


export default async function RootLayout({ children }: Children) {
  console.log(`REGION: ${process.env.REGION}`);
  console.log(`USER_POOL_WEB_CLIENT_ID: ${process.env.USER_POOL_WEB_CLIENT_ID}`);
  console.log(`NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET}`);
  console.log(`NEXTAUTH_URL: ${process.env.NEXTAUTH_URL}`);
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">
        <Providers>
          <main className="woh__site-content">
            <SiteTitleString />
            <NavBar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
