"use client"
import Link from "next/link";
import {allPaths} from "../../allPaths";
import {useSession} from "next-auth/react";
import "./nav-bar.css"

export default function ProtectedPaths(){
  const {data: session} = useSession();
  return session ? <>
    <div className="woh__nav-bar-string">
      <Link href={allPaths.HOME} className="text-white font-bold text-xl">
        Dashboard
      </Link>
    </div>
    <div className="woh__nav-bar-string">
      <Link href={allPaths.HOME} className="text-white font-bold text-xl">
        Profile
      </Link>
    </div>
  </> : null;
}
