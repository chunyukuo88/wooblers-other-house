import {allPaths} from "../../allPaths";
import Link from "next/link";

export default function SiteTitleString() {
  return (
    <h1>
      <Link href={allPaths.HOME}>
        Woobler's Other House
      </Link>
    </h1>
  )
}
