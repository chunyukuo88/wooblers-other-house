// import {getServerSession} from "next-auth";
// import {redirect} from "next/navigation";
// import {allPaths} from "../../allPaths";

export default async function ProtectedRoute() {
  // const session = await getServerSession();
  // if (!session || !session.user) {
  //   redirect(allPaths.LOGIN);
  // }

  return (
    <div>
      Protected Route
    </div>
  )
}
