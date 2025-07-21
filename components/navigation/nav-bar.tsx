"use client"
import {ReactNode, useState} from "react";
import Link from "next/link";
import {allPaths} from "../../allPaths";
import {usePathname} from "next/navigation";
import {signOut, useSession} from "next-auth/react";
import {AlbumSelector} from "@/components/navigation/album-selector";
import "./nav-bar.css"

export default function NavBar({fontColor}: NavBarProps) {
  const pathname = usePathname();
  const {data: session} = useSession();

  const style = getStyle(fontColor)
  const shouldShowLogin = (!session && pathname !== allPaths.LOGIN);

  const LogoutOrHome = () => session
    ? <a className="woh__logout-button" onClick={() => signOut()}>Logout</a>
    : <Link href={allPaths.HOME}>Home</Link>;

  return (
    <div className="woh__nav-bar" style={style}>
      <div className="woh__nav-bar-string">
        {pathname === allPaths.SETTINGS
          ? <Link href={allPaths.HOME}>Home</Link>
          : <NavLink href={allPaths.SETTINGS}>Settings</NavLink>
        }
      </div>
      <div className="woh__nav-bar-string">
        {pathname === allPaths.TECH
          ? <Link href={allPaths.HOME}>Home</Link>
          : <NavLink href={allPaths.TECH}>Tech</NavLink>
        }
      </div>
      <div className="woh__nav-bar-string">
        {pathname === allPaths.BREAD
          ? <Link href={allPaths.HOME}>Home</Link>
          : <NavLink href={allPaths.BREAD}>Bread</NavLink>
        }
      </div>
      {/*<div className="woh__nav-bar-string">*/}
      {/*  {shouldShowLogin*/}
      {/*    ? <NavLink href={allPaths.LOGIN}>Admin</NavLink>*/}
      {/*    : <LogoutOrHome/>*/}
      {/*  }*/}
      {/*</div>*/}
      <div className="woh__nav-bar-string">
        {pathname === allPaths.HOME
          ? <AlbumSelector style={style}/>
          : <div className="woh_album-picker-placeholder"></div>
        }
      </div>
    </div>
  );
}

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

// TODO: Coming attraction
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

type NavBarProps = {
  fontColor: string;
}

const getStyle = (fontColor: string) => {
  const shadowColor = (!fontColor) ? "gray" : "black";

  const textShadow = (fontColor !== "black")
    ? `-1px -1px 0 ${shadowColor}, ` +
    `1px -1px 0 ${shadowColor}, ` +
    `-1px 1px 0 ${shadowColor}, ` +
    `1px 1px 0 ${shadowColor}`
    : undefined;

  return {
    color: fontColor,
    transition: "2s ease-in",
    fontSize: "1.25rem",
    textShadow,
    fontWeight: 700,
  };
};
