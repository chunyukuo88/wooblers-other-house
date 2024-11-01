import {allPaths} from "../../allPaths";
import Link from "next/link";
import "./site-title-string.css";

type SiteTitleStringProps = {
  fontColor: string;
}

export default function SiteTitleString(props: SiteTitleStringProps) {
  const {fontColor} = props;
  const style = {
    color: fontColor,
    transition: "1s",
  }
  return (
    <h1 className="woh__site-title-string" style={style}>
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
