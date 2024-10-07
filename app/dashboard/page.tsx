import ProtectedRoute from "../protected/page";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {allPaths} from "../../allPaths";

export default async function Dashboard() {
  const session = await getServerSession();
  console.log(session);
  if (!session || !session.user) {
    console.log("no session ._.");
    redirect(allPaths.LOGIN);
  }

  console.log("Yay! Dashboard");
  return (
    <>
      Welcome to the Dashboard ~
    </>
  );
}