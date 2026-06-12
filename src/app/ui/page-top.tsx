"use client";
import Link from "next/link";
import React from "react";
import SiteHeader from "./header/SiteHeader";
type PageProps = {
  has_sub?: boolean;
  has_h2?: boolean;
  title?: string;
  h2?: string;
  sub_title?: string;
  url?: string;
  sub_url?: string;
  bg_color?: string;
  noheader?: boolean;
};
//
export default function PageTop({
  page,
  is_logged,
}: {
  page: PageProps;
  is_logged?: boolean;
}) {
  return (
    <section className={`page-top`}>
      <div
        className={`page-overlay-${page?.bg_color ? page?.bg_color : "sky"}`}
      ></div>
      <SiteHeader is_logged={is_logged} />
      {!page.noheader && (
        <div className="page-info">
          <h1>{page.title}</h1>
          <h2>{page.h2}</h2>
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            {page?.has_sub && (
              <Link href={`${page?.sub_url}`}>{page?.sub_title}</Link>
            )}
            <span>{page.title}</span>
          </div>
        </div>
      )}
    </section>
  );
}
