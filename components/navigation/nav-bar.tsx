"use client"
import Link from "next/link";
import {allPaths} from "../../allPaths";
import "./nav-bar.css"
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";

function ProtectedPaths(){
  const {data: session} = useSession();
  return session ? <>
    <div className="woh__nav-bar-string">
      <Link href={allPaths.HOME}>
        Dashboard
      </Link>
    </div>
    <div className="woh__nav-bar-string">
      <Link href={allPaths.HOME}>
        Profile
      </Link>
    </div>
  </> : null;
}

export default function NavBar() {
  const pathname = usePathname();
  return (
    <div className="woh__nav-bar">
      <div className="woh__nav-bar-string">
        {pathname !== allPaths.LOGIN
          ? <Link href={allPaths.LOGIN}>Login</Link>
          : <Link href={allPaths.HOME}>Home</Link>
        }
      </div>
      <div className="woh__nav-bar-string">
        <Link href={allPaths.SETTINGS}>
          Settings
        </Link>
      </div>
      <ProtectedPaths/>
    </div>
  );
}
