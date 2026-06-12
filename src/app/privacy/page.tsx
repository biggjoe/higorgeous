import { post } from "@/app/lib/fetchData";
import { HtmlMarkup } from "@/app/lib/processHtml";
import { Metadata } from "next";
import React from "react";
import PageTop from "../ui/page-top";
import { getCookie } from "../lib/auth_base/cookie_auth";

export const metadata: Metadata = {
  metadataBase: new URL("https://higorgeous.co.uk"),
  title: "Privacy Policy",
  description: "HiGorgeous Privacy Policy",
};
export default async function Home() {
  const user = await getCookie("user");
  const res = await post({ slug: "privacy" }, "fetch_page");
  const page = res.status
    ? res.data
    : { title: "Privacy Policy", description: "Error fetching page" };

  return (
    <React.Fragment>
      <PageTop
        is_logged={user ? true : false}
        page={{ title: page?.title, url: "/privacy", bg_color: "beige" }}
      />
      <div className="page-body">
        <section className="home-section">
          <div className="pane-container mb30">
            <div className="half-pane white px20 py20">
              <HtmlMarkup word={page.description} />
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}
