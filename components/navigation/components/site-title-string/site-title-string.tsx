import {allPaths} from "../../../allPaths";
import Link from "next/link";
import "../styles/site-title-string.css";

type SiteTitleStringProps = {
  fontColor: string;
}

export default function SiteTitleString(props: SiteTitleStringProps) {
  const {fontColor} = props;
  const shadowColor = (!fontColor) ? "gray" : "black";

  const textShadow = (fontColor !== "black")
    ? `-1px -1px 0 ${shadowColor}, ` +
    `1px -1px 0 ${shadowColor}, ` +
    `-1px 1px 0 ${shadowColor}, ` +
    `1px 1px 0 ${shadowColor}`
    : undefined;

  const style = {
    color: fontColor,
    transition: "2s ease-in",
    textShadow,
  };

  return (
    <h1 className="woh__site-title-string" style={style}>
      <div className="woh__wiggling-cars">🚛</div>
      <Link href={allPaths.HOME}>
        <div className="woh_drop-in">
          <img id="santa-hat" src="/images/seasonal/santa-hat__small.png" alt="A santa hat"/>
          <div>Woobler's</div>
        </div>
        <div className="woh_drop-in">Other</div>
        <div className="woh_eventual-slant">House</div>
      </Link>
      <div className="woh__wiggling-cars">🚔</div>
    </h1>
  )
}
