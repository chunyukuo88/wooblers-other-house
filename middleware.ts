import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {getCurrentUser} from "aws-amplify/auth";
import {allPaths, protectedPaths} from "./allPaths";

export async function middleware(request: NextRequest) {
  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    try {
      await getCurrentUser();
      return NextResponse.next();
    } catch (error) {
      const { LOGIN } = allPaths;
      const loginUrl = new URL(LOGIN, request.url);
      loginUrl.searchParams.set("from", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    `${allPaths.DASHBOARD}:path*`,
    `${allPaths.PROFILE}:path*`,
    `${allPaths.SETTINGS}:path*`
  ],
};
