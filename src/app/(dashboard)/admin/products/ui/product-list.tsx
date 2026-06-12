"use client";
import ProductList from "@/app/ui/all-products";
import Link from "next/link";

export default function ListPage({
  list,
  categories,
  is_admin,
  is_logged,
  user,
}: {
  list: any;
  categories: any;
  is_admin: boolean;
  is_logged: boolean;
  user: any;
}) {
  const launchNew = () => {};
  const launchNewCat = () => {};

  return (
    <>

     <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <span>Products</span>
        </div>
      </div>
      
      <div className="dashboard-page-content">
        <div className="flex flex-row align-items-center mb10">
          <span className="group-btn">
          </span>
          <span className="spacer align-items-center justify-content-center">
            -
          </span>
          <span className="group-btn">
            <Link href="/admin/products/new">
              New <span className="sm-hide px5">Product</span>
            </Link>
            <Link href="/admin/products/newcategory">
              New Cat<span className="sm-hide">egory</span>
            </Link>
          </span>
        </div>
        <div className="page-body">
          <ProductList
            is_admin={true}
            products={list}
            categories={categories}
            is_logged={user ? true : false}
            user={user}
          />
        </div>
      </div>
    </>
  );
}
