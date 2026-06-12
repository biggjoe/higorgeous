import React from "react";
import { fetchProductDetails } from "@/app/lib/fetchData";
import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import { ProductDetails } from "@/app/ui/product-details";
import PageTop from "@/app/ui/page-top";
import type { Metadata, ResolvingMetadata } from "next";

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
  const product = await fetchProductDetails(par.slug);
  const previousImages = (await parent).openGraph?.images || [];
  const product_image = `${FILE_URL}${product.picture}`;
  const barcode_image = `${FILE_URL}${product.barcode_image}`;
  const this_arr = [product_image, barcode_image];
  return {
    title: `${product.title} - ${product.sub_title} - Hi Gorgeous Skin Care`,

    openGraph: {
      //images: [...this_arr, ...previousImages],
      images: [product_image],
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
  const product = await fetchProductDetails(par.slug);
  const user = await getCookie("user");
  return (
    <React.Fragment>
      <PageTop
        page={{
          has_sub: true,
          has_h2: true,
          title: product?.title,
          h2: product?.sub_title,
          sub_title: "Products",
          url: product?.url,
          sub_url: "/products",
          bg_color: "sky",
        }}
      />
      <ProductDetails product={product} user={user} is_admin={true} />
    </React.Fragment>
  );
}
