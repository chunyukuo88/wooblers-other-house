"use client";
import {signIn, signOut, useSession} from "next-auth/react";
import Link from 'next/link';
import {allPaths} from "../../allPaths";

function AuthButton() {
  const {data: session} = useSession();

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }

  return (
    <>
      Not signed in<br/>
      <Link href={allPaths.LOGIN}>
        <button onClick={() => signIn("credentials")}>Login In</button>
      </Link>
    </>
  )
}

export default function NavMenu() {
  return (
    <div>
      <AuthButton />
    </div>
  )
}
