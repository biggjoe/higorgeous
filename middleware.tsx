import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import { checkSession } from "@/app/lib/fetchData";
import { NextRequest, NextResponse } from "next/server";
/* */
export async function middleware(req: NextRequest) {
  const token = await getCookie("access_token");
  const usr = await getCookie("user");
  const loginUrl = new URL("/login", req.url);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    //const response = await fetch(`${backendUrl}/validate-token/${token}`);
    const response = await checkSession();
    const data = response;

    if (!data.status) {
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    console.error("Token validation error:", error);
    //return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  response.headers.set("Authorization", "Bearer " + token);
  return response;
}
/////////

/*
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/about")) {
    return NextResponse.rewrite(new URL("/about-2", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  }
}*/
export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
