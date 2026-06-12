import Link from "next/link";
import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import EditPolicy from "../ui/edit-policy";
import { post } from "@/app/lib/fetchData";

//
export async function generateMetadata() {
  return {
    title: `Edit Privacy Page `,
    description: `Edit Privacy Page `, // meta description
  };
}

export default async function Page() {
  //const par = await params;
  const user = await getCookie("user");
  const res = await post({ slug: "privacy" }, "fetch_page");
  console.log(res);
  const page = res.status
    ? res.data
    : { title: "Privacy Policy", description: "Error fetching page" };

  return (
    <>
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/privacy-policy">Privacy</Link>
          <span>Edit Privacy</span>
        </div>
      </div>
      <div className="dashboard-page-content">
        <EditPolicy
          page={page}
          is_admin={user && user.role === "admin" ? true : false}
          is_logged={user ? true : false}
          user={user}
        />
      </div>
    </>
  );
}
