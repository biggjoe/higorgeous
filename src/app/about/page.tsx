import { post } from "@/app/lib/fetchData";
import { HtmlMarkup } from "@/app/lib/processHtml";
import { Metadata } from "next";
import React from "react";
import PageTop from "../ui/page-top";
import { getCookie } from "../lib/auth_base/cookie_auth";

export const metadata: Metadata = {
  metadataBase: new URL("https://higorgeous.co.uk"),
  title: "About HiGorgeous",
  description: "High Quality Skin care products",
};

export default async function Home() {
  const user = await getCookie("user");
  const res = await post({ slug: "about" }, "fetch_page");
  const page = res.status
    ? res.data
    : { title: "About HiGorgeous", description: "Error fetching page" };

  return (
    <React.Fragment>
      <PageTop
        is_logged={user ? true : false}
        page={{ title: page?.title, url: "/about", bg_color: "sky" }}
      />
      <div className="page-body">
          <div className="pane-container py30">
            <div className="half-pane white px20 py20">
              <HtmlMarkup word={page.description} />
            </div>
          </div>
      </div>
    </React.Fragment>
  );
}
