import React from "react";
import { fetchProductDetails, post } from "@/app/lib/fetchData";
import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import { ProductDetails } from "@/app/ui/product-details";
import PageTop from "@/app/ui/page-top";
import type { Metadata, ResolvingMetadata } from "next";
import { ProductCatalog } from "@/app/ui/product-catalog";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const FILE_URL = process.env.SERVER_ROOT;
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const par = await params;
  const rs = await post({ cat_url: par.slug }, "products_by_category");
  const product = rs.status ? rs : {};
  const previousImages = (await parent).openGraph?.images || [];
  const product_image = `${FILE_URL}${product.picture}`;
  const barcode_image = `${FILE_URL}${product.barcode_image}`;
  const this_arr = [product_image, barcode_image];
  return {
    title: `${product.title} - ${product.sub_title} - ${product.barcode} - Hi Gorgeous Skin Care`,

    openGraph: {
      images: [...this_arr, ...previousImages],
    },
    description: `${product.barcode} - ${product.sub_title} - ${product.description}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const par = await params;
  const rs = await post(
    { cat_url: par.slug, is_catalog: true },
    "products_by_category"
  );
  const category = rs.status ? rs : {};
  return (
    <React.Fragment>
      <PageTop
        page={{
          has_sub: true,
          has_h2: true,
          title: category?.title,
          sub_title: "Product Catalog",
          url: category?.slug,
          sub_url: `/catalog`,
          bg_color: "sky",
        }}
      />
      {category?.data && (
        <ProductCatalog category={category} products={category?.data} />
      )}
    </React.Fragment>
  );
}
