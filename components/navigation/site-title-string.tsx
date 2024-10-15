import {allPaths} from "../../allPaths";
import Link from "next/link";
import "./site-title-string.css";

export default function SiteTitleString() {
  return (
    <h1 className="woh__site-title-string">
      <div className="woh__wiggling-cars">🚛 </div>
        <Link href={allPaths.HOME}>
          Woobler's Other House
        </Link>
      <div className="woh__wiggling-cars"> 🚔</div>
    </h1>
  )
}
