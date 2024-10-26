"use client"
import Link from "next/link";
import {allPaths} from "../../allPaths";
import {usePathname} from "next/navigation";
import {signOut, useSession} from "next-auth/react";
import "./nav-bar.css"

function ProtectedPaths(){
  const {data: session} = useSession();
  const pathname = usePathname();

  return session ? <>
    <div className="woh__nav-bar-string">
      {pathname === allPaths.DASHBOARD
        ? null
        : <Link href={allPaths.DASHBOARD}>Dashboard</Link>
      }
    </div>
    <div className="woh__nav-bar-string">
      {pathname === allPaths.PROFILE
        ? null
        : <Link href={allPaths.PROFILE}>Profile</Link>
      }

    </div>
  </> : null;
}

export default function NavBar() {
  const pathname = usePathname();
  const {data: session} = useSession();

  const shouldShowLogin = (!session && pathname !== allPaths.LOGIN);
  const LogoutOrHome = () => session
    ? <a className="woh__logout-button" onClick={() => signOut()}>Logout</a>
    : <Link href={allPaths.HOME}>Home</Link>;

  return (
    <div className="woh__nav-bar">
      <div className="woh__nav-bar-string">
        {shouldShowLogin
          ? <Link href={allPaths.LOGIN}>Login</Link>
          : <LogoutOrHome/>
        }
      </div>
      <div className="woh__nav-bar-string">
        {pathname === allPaths.SETTINGS
          ? null
          : <Link href={allPaths.SETTINGS}>Settings</Link>
        }
      </div>
      <div className="woh__nav-bar-string">
        {pathname === allPaths.TECH
          ? null
          : <Link href={allPaths.TECH}>Tech</Link>
        }
      </div>
      <ProtectedPaths/>
    </div>
  );
}
