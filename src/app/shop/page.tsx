import PageTop from "../ui/page-top";
import React from "react";
import { fetchProductCategories, fetchProducts } from "../lib/fetchData";
import ProductList from "../ui/all-products";
import { getCookie } from "../lib/auth_base/cookie_auth";
export async function generateMetadata() {
  return {
    title: `Buy Hi Gorgeous  Products`,
    description: `Buy Hi Gorgeous Products`, // meta description
  };
} /**/
export default async function Page() {
  const user = await getCookie("user");
  const categories = [
    { slug: "../", title: "All", id: -1 },
    ...(await fetchProductCategories()),
  ];
  const products = await fetchProducts();
  return (
    <React.Fragment>
      <PageTop
        is_logged={user ? true : false}
        page={{ title: "Buy Our Products", url: "/shop", bg_color: "sky" }}
      />
      <div className="page-body">
        <div className="page-vertical-pad">
          <ProductList
            is_admin={true}
            products={products}
            categories={categories}
            is_logged={user ? true : false}
            user={user}
            shop={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
