import {allPaths} from "../../allPaths";
import Link from "next/link";
import "./site-title-string.css";

export default function SiteTitleString() {
  return (
    <h1 className="woh__site-title-string">
      <div className="woh__wiggling-cars">🚛 </div>
      <Link href={allPaths.HOME}>
        <div className="woh_drop-in">Woobler's </div>
        <div className="woh_drop-in">Other </div>
        <div className="woh_eventual-slant">House</div>
      </Link>
      <div className="woh__wiggling-cars"> 🚔</div>
    </h1>
  )
}
