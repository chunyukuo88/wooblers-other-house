import {getServerSession} from "next-auth";
import Providers from "./components/SessionProvider";
import "../styles/global.css";
import "./layout.css";

interface Children {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Children) {
  const session = await getServerSession();
  const name = session?.user?.name;

  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">
        <Providers>
          <main>
            <h1>Woobler's Other House</h1>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
