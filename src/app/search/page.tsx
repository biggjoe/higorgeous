import PageTop from "../ui/page-top";
import React from "react";
import { fetchProductCategories, fetchProducts } from "../lib/fetchData";
import ProductList from "../ui/all-products";
import { getCookie } from "../lib/auth_base/cookie_auth";
import { FaSearch } from "react-icons/fa";
import SearchBar from "./ui/search-bar";
import { FaSearchengin } from "react-icons/fa6";
export async function generateMetadata() {
  return {
    title: `All HiGorgeous Products`,
    description: `HiGorgeous Products`, // meta description
  };
} /**/
export default async function Page() {
  return (
    <React.Fragment>
      <PageTop page={{ noheader: true }} />
      <div className="page-body py30">
        <h1 className="flex align-items-center">
         
          <FaSearch className="pr5"/> Search Products
        </h1>
        <div className="page-vertical-pad">
          <SearchBar />
        </div>
      </div>
    </React.Fragment>
  );
}
