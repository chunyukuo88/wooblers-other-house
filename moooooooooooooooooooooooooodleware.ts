import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {getCurrentUser} from "aws-amplify/auth";
import {allPaths, protectedPaths} from "./allPaths";

export async function middleware(request: NextRequest) {
  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    const loginUrl = new URL(allPaths.LOGIN, request.url);

    try {
      const user = await getCurrentUser();
      if (user) {
        return NextResponse.next();
      }
      return NextResponse.redirect(loginUrl);
    } catch (error) {
      loginUrl.searchParams.set("from", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Template literals within the `matcher` array are not yet supported by NextJS.
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};
