import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import { checkSession } from "@/app/lib/fetchData";
import { NextRequest, NextResponse } from "next/server";
/* */
export async function middleware(req: NextRequest) {
  const token = await getCookie("access_token");
  const is_token = token ? true : false;
  const usr = await getCookie("user");
  const loginUrl = new URL("/login", req.url);
  const adminUrl = new URL("/admin", req.url);
  const restrcited_url_notice = new URL("/unauthorized", req.url);
  //
  const is_login_route = req.nextUrl.pathname.startsWith("/login")
    ? true
    : false;
  const is_admin_route = req.nextUrl.pathname.startsWith("/admin")
    ? true
    : false;

  console.log("THIS IS MIDDLEWARE user role:::", usr?.role);
  console.log("IS MIDDLEWARE TOKEN?:::", is_token);
  console.log("NEXT ROUTE:::", req.nextUrl.pathname);

  if (!token || !usr) {
    return NextResponse.redirect(loginUrl);
  }

  if (is_admin_route && usr?.role !== "admin") {
    return NextResponse.redirect(restrcited_url_notice);
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

  if (request.nextUrl.pathname.startsWith("")) {
    return NextResponse.rewrite(new URL("/user", request.url));
  }
}*/
export const config = {
  matcher: [
    "/admin/:path*",
    "/account/:path*"
  ],
};
