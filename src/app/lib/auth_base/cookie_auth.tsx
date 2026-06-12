"use server";
import { cookies } from "next/headers";

export async function saveCookie(name: string, token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  //const session = await encrypt({ userId, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set(name, token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "strict",
  });
}

export async function getCookie(name: string) {
  const userJson: any = (await cookies()).get(name)?.value;
  //
  let tkn: any = null;
  if (name === "user") {
    tkn = userJson ? JSON.parse(userJson) : null;
  } else {
    tkn = userJson ? userJson : null;
  }
  return tkn;
}

async function rmCookie(name: string) {
  (await cookies()).delete(name);
}
export async function removeCookie(name: string) {
  return rmCookie(name);
}
export async function removeMultiCookie(name: string[]) {
  name.forEach((n: string) => {
    // /rmCookie(n);
  });
}

export async function getAuthPath(path: string) {
  return `${process.env.API_DOMAIN}${path}?secret=${process.env.API_SECRET}`;
}
