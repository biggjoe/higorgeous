"use client";

import Link from "next/link";

export default function CategoryList({
  categories,
  is_admin,
  is_logged,
  user,
}: {
  categories: any;
  is_admin: boolean;
  is_logged: boolean;
  user: any;
}) {
  return (
    <>
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Admin Dashboard</Link>
          <Link href="/admin/products">Products</Link>
          <span>Categories</span>
        </div>
      </div>

      <div className="dashboard-page-content">
        <div className="flex flex-row align-items-center mb10">
          <span className="group-btn"></span>
          <span className="spacer align-items-center justify-content-center">
            -
          </span>
          <span className="group-btn">
            <Link href="/admin/products/newcategory">
              New Cat<span className="sm-hide">egory</span>
            </Link>
          </span>
        </div>

        <div className="dashboard-navgation">
          <ul>
            {categories.map((item: any) => (
              <li key={item.id}>
                <Link href={`#`} style={{ minHeight: "100px" }}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
