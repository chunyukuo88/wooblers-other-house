"use client"
import {ReactNode, useState} from "react";
import Link from "next/link";
import {allPaths} from "../../allPaths";
import {usePathname} from "next/navigation";
import {signOut, useSession} from "next-auth/react";
import "./nav-bar.css"

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

function NavLink({href, children}: NavLinkProps) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    if (!isHovering) {
      setIsHovering(true);
      fetch(href).catch((error) => console.error('Prefetching failed:', error));
    }
  };

  return (
    <Link href={href} onMouseEnter={handleMouseEnter}>
      {children}
    </Link>
  );
}

function ProtectedPaths(){
  const {data: session} = useSession();
  const pathname = usePathname();

  return session ? <>
    <div className="woh__nav-bar-string">
      {pathname === allPaths.DASHBOARD
        ? null
        : <NavLink href={allPaths.DASHBOARD}>Dashboard</NavLink>
      }
    </div>
    <div className="woh__nav-bar-string">
      {pathname === allPaths.PROFILE
        ? null
        : <NavLink href={allPaths.PROFILE}>Profile</NavLink>
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
          ? <NavLink href={allPaths.LOGIN}>Login</NavLink>
          : <LogoutOrHome/>
        }
      </div>
      <div className="woh__nav-bar-string">
        {pathname === allPaths.SETTINGS
          ? null
          : <NavLink href={allPaths.SETTINGS}>Settings</NavLink>
        }
      </div>
      <div className="woh__nav-bar-string">
        {pathname === allPaths.TECH
          ? null
          : <NavLink href={allPaths.TECH}>Tech</NavLink>
        }
      </div>
      <ProtectedPaths/>
    </div>
  );
}
