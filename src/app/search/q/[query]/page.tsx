import React from "react";
import { fetchProductDetails, post } from "@/app/lib/fetchData";
import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import { ProductDetails } from "@/app/ui/product-details";
import PageTop from "@/app/ui/page-top";
import type { Metadata, ResolvingMetadata } from "next";
import SearchResults from "@/app/ui/search-results";
import SearchBar from "../../ui/search-bar";

type Props = {
  params: Promise<{ query: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const FILE_URL = process.env.SERVER_ROOT;
export async function generateMetadata() {
  return {
    title: `Search Products - Hi Gorgeous `,
    description: `Hi Gorgeous Products Search`, // meta description
  };
} /**/

export default async function Page({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const par = await params;
  const rs = await post({ q: decodeURI(par?.query) }, "search_product");
  console.log(rs);
  const results = rs.status ? rs.data : [];
  const user = await getCookie("user");
  return (
    <React.Fragment>
      <PageTop page={{ noheader: true }} />
      <div className="page-body py30">
        <h1>
          <u>{results.length}</u> result{results.length > 1 ? "s" : ""} for{" "}
          <u>"{decodeURI(par?.query)}"</u> Search
        </h1>
        <div className="py30">
          <SearchBar />
          <SearchResults results={results} />
        </div>
      </div>
    </React.Fragment>
  );
}
