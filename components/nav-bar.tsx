import Link from "next/link";
import {allPaths} from "../allPaths";

export default function NavBar() {
  return (
    <>
      <Link href={allPaths.HOME} className="text-white font-bold text-xl">
        MyApp
      </Link>
    </>
  )
}