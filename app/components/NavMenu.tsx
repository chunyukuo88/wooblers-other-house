"use client";
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";

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
      <button onClick={() => signIn()}>Sign In</button>
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