import { getAuthPath, getCookie } from "./auth_base/cookie_auth";
import axios from "axios";

export default async function HttpPost(
  data: any,
  endpoint: string,
  isFormdata: boolean = false
) {
  const url = await getAuthPath(endpoint);
  const access_token = await getCookie("access_token");
  const load: any = isFormdata ? data : JSON.stringify(data);
  const res = await fetch(url, {
    method: "POST",
    headers: isFormdata
      ? {
          Authorization: "Bearer " + access_token,
        }
      : {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
    body: load,
    cache: "no-cache", //if you don't want to cache the request
  });
  const rs = await res.json();
  if (!res.ok) {
    return { status: false, message: "Fetch Failed" };
  }
  return rs;
}

export async function HttpPostForm(data: any, endpoint: string) {
  const access_token = await getCookie("access_token");
  const url = await getAuthPath(endpoint);

  const res = await axios.post(url, data, {
    headers: {
      Authorization: "Bearer " + access_token,
      "content-Type": "multipart/formdata",
    },
  });
  console.log("sevr::", res);
  return res.data;
}
export async function HttpPostPlain(data: any, endpoint: string) {
  console.log("svr::", data);
  const access_token = await getCookie("access_token");
  const url = await getAuthPath(endpoint);

  const res = await axios.post(url, data, {
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return res.data;
}
