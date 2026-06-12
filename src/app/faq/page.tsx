import { post } from "@/app/lib/fetchData";
import { HtmlMarkup } from "@/app/lib/processHtml";
import { Metadata } from "next";
import React from "react";
import PageTop from "../ui/page-top";
import { getCookie } from "../lib/auth_base/cookie_auth";
import FaqPane from "./faq-pane";

export const metadata: Metadata = {
  metadataBase: new URL("https://higorgeous.co.uk"),
  title: "Frequently Asked Questions",
  description: "High Quality Skin care products",
};

export default async function Home() {
  const user = await getCookie("user");
  const res = await post({}, "list_faq");
  console.log(res);
  const page = res.status
    ? res.data
    : {
        title: "Frequently Asked Questions",
        description: "Error fetching page",
      };

  return (
    <React.Fragment>
      <PageTop
        is_logged={user ? true : false}
        page={{
          title: "Frequently Asked Questions",
          url: "/faq",
          bg_color: "sky",
        }}
      />
      <div className="page-body">
        <div className="pane-container py30">
  
          <div className="half-pane white px20 py20">
           {res.status && <FaqPane data={page} />} {/*  */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
