import {getServerSession} from "next-auth";
import Providers from "./components/SessionProvider";
import NavMenu from "./components/NavMenu";

interface Children {
  children: React.ReactNode;
}

export default async function RootLayout({children}: Children) {
  const session = await getServerSession();
  const name = session?.user?.name;

  return (
    <html lang="en">
      <body>
        <Providers>
          <main>
            <NavMenu />
            {session && <p>Welcome, {name}!</p>}
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
