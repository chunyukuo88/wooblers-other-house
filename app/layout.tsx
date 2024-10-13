import Providers from "../components/SessionProvider";
import "../styles/global.css";
import NavBar from "@/components/navigation/nav-bar";
import SiteTitleString from "@/components/navigation/site-title-string";

interface Children {
  children: React.ReactNode;
}


export default async function RootLayout({ children }: Children) {
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
