import { getCookie } from "./auth_base/cookie_auth";

export async function postLike(data: any) {
  console.log(data, process.env.NEXT_PUBLIC_API_DOMAIN);
  const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}like_item?secret=${process.env.NEXT_PUBLIC_API_SECRET}`;
  const access_token = await getCookie("access_token");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store", //if you don't want to cache the request
  });

  if (!res.ok) {
    return { status: false, message: "Fetch Failed" };
  }
  const rs = await res.json();
  return rs;
}
export async function postShare(data: any) {
  const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}save_share?secret=${process.env.NEXT_PUBLIC_API_SECRET}`;
  const access_token = await getCookie("access_token");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store", //if you don't want to cache the request
  });

  if (!res.ok) {
    return { status: false, message: "Fetch Failed" };
  }
  const rs = await res.json();
  return rs;
}

export async function postLogin(data: any) {
  const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}login?secret=${process.env.NEXT_PUBLIC_API_SECRET}`;
  const access_token = "";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      //Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    //body: JSON.stringify(Object.fromEntries(formData.entries())),
    body: JSON.stringify(data),
    cache: "no-store", //if you don't want to cache the request
  });
  if (!res.ok) {
    return { status: false, message: "Http Failed" };
  }
  const rs = await res.json();
  return rs;
}

export async function postDelete(data: any) {
  const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}delete_item?secret=${process.env.NEXT_PUBLIC_API_SECRET}`;
  const access_token = await getCookie("access_token");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store", //if you don't want to cache the request
  });
  const rs = await res.json();
  console.log(rs);
  if (!res.ok) {
    return { status: false, message: "Fetch Failed" };
  }
  return rs;
}

export async function postPublish(data: any) {
  const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}publish_item?secret=${process.env.NEXT_PUBLIC_API_SECRET}`;
  const access_token = await getCookie("access_token");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store", //if you don't want to cache the request
  });
  const rs = await res.json();
  console.log(rs);
  if (!res.ok) {
    return { status: false, message: "Fetch Failed" };
  }

  return rs;
}
