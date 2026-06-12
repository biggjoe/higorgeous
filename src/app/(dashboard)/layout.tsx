
import React from "react";
import SiteHeader from "../ui/header/SiteHeader";
import { getCookie } from "../lib/auth_base/cookie_auth";

export default async function Layout({ children }: { children: React.ReactNode }) {

  const tog: any[] = [];
  const togMore = (index: number) => {
    if (!tog[index]) {
      tog[index] = true;
    } else {
      tog[index] = !tog[index];
    }
    console.log(tog);
  };
  const user = await getCookie("user");
  return (
    <React.Fragment>
      <div className={`page-top-mini`}>
        <div className={`page-overlay-beige`}></div>
        <SiteHeader is_home={false} is_logged={user ? true:false} />
      </div>
      <div className="py30">
        <div className="page-wrap white">{children}</div>
      </div>
    </React.Fragment>
  );
}
