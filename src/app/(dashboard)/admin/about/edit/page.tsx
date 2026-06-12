import Link from "next/link";
import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import EditAbout from "../ui/edit-about";
import { post } from "@/app/lib/fetchData";

//
export async function generateMetadata() {
  return {
    title: `Edit About Page `,
    description: `Edit About Page `, // meta description
  };
}

export default async function Page() {
  //const par = await params;
  const user = await getCookie("user");
  const res = await post({ slug: "about" }, "fetch_page");
  console.log(res);
  const page = res.status
    ? res.data
    : { title: "About", description: "Error fetching page" };
  return (
    <>
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/about">About</Link>
          <span>Edit About</span>
        </div>
      </div>
      <div className="dashboard-page-content">
        <EditAbout
          page={page}
          is_admin={user && user.role === "admin" ? true : false}
          is_logged={user ? true : false}
          user={user}
        />
      </div>
    </>
  );
}
