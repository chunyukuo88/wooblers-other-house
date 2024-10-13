import ProtectedRoute from "../protected/page";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {allPaths} from "../../allPaths";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect(allPaths.LOGIN);
  }

  return (
    <>
      Welcome to the Dashboard ~
    </>
  );
}