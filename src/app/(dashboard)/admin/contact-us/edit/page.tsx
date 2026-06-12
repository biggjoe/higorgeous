import Link from "next/link";
import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import EditContactUs from "../ui/edit-contact-us";
import { post } from "@/app/lib/fetchData";

//
export async function generateMetadata() {
  return {
    title: `Edit Contact Us Page `,
    description: `Edit Contact Us Page `, // meta description
  };
}

export default async function Page() {
  //const par = await params;
  const user = await getCookie("user");
  const res = await post({ slug: "contact-higorgeous" }, "fetch_page");
  console.log(res);
  const page = res.status
    ? res.data
    : { title: "Contact Us", description: "Error fetching page" };

  return (
    <>
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/contact-us">Contact Us</Link>
          <span>Edit Contact Us</span>
        </div>
      </div>
      <div className="dashboard-page-content">
        <EditContactUs
          page={page}
          is_admin={user && user.role === "admin" ? true : false}
          is_logged={user ? true : false}
          user={user}
        />
      </div>
    </>
  );
}
