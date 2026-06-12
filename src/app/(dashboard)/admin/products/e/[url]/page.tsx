import React from "react";
import {
  fetchProductCategories,
  fetchProductDetails,
} from "@/app/lib/fetchData";
import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import EditProduct from "../../ui/edit-product";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ url: string }>;
}) {
  const par = await params;
  const member = await fetchProductDetails(par.url);

  return {
    title: `${member.title}`,
    description: member.content, // meta description
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ url: string }>;
}) {
  const par = await params;
  const products = await fetchProductDetails(par.url);

  console.log("prods::",products)
  const user = await getCookie("user");
  const categories = await fetchProductCategories();
  return (
    <React.Fragment>
      <EditProduct
        categories={categories}
        product={products}
        is_logged={user ? true : false}
        user={user}
      />
    </React.Fragment>
  );
}
