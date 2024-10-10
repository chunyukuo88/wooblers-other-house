import Link from "next/link";
import {allPaths} from "../../allPaths";
import ProtectedPaths from "@/components/navigation/nav-bar-protected";
import "./nav-bar.css"

export default function NavBar() {
  return (
    <div className="woh__nav-bar">
      <div className="woh__nav-bar-string">
        <Link href={allPaths.LOGIN}>
          Login
        </Link>
      </div>
      <div className="woh__nav-bar-string">
        <Link href={allPaths.SETTINGS}>
          Settings
        </Link>
      </div>
      <ProtectedPaths/>
    </div>
  );
}