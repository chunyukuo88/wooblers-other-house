"use client";
import {signIn, signOut, useSession} from "next-auth/react";
import Link from 'next/link';
import {allPaths} from "../allPaths";

export default function AuthButton() {
  const {data: session} = useSession();
  return (session)
    ? <button onClick={() => signOut()}>Sign Out</button>
    : <Link href={allPaths.LOGIN}>
        <div onClick={() => signIn("credentials")}>Login In</div>
      </Link>;
}

