import PageTop from "../ui/page-top";
import React from "react";
import { fetchProducts, post } from "../lib/fetchData";
import { ProductCatalog } from "../ui/product-catalog";
export async function generateMetadata() {
  return {
    title: `All Hi Gorgeous Products Catalog`,
    description: `Catalog of all Hi Gorgeous Products`, // meta description
  };
} /**/
export default async function Page() {
  const rs = await post({ is_catalog: true }, "all_products");
  const products = rs.status ? rs.data : [];
  return (
    <React.Fragment>
      <PageTop
        page={{ title: "Product Catalog", url: "/catalog", bg_color: "sky" }}
      />

      <ProductCatalog products={products} />
    </React.Fragment>
  );
}
