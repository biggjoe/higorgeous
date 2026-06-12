import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import { post } from "@/app/lib/fetchData";
import Link from "next/link";
import FaqList from "./ui/faq-list";

//

//
export default async function Page() {
  const user = await getCookie("user");
  const res = await post({}, "list_faq");
  console.log(res);
  const page = res.status
    ? res.data
    : {
        title: "Frequently Asked Questions",
        description: "Error fetching page",
      };

  return (
    <>
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <span>FAQ</span>
        </div>
      </div>

      {res.status && <FaqList page={page} />}
    </>
  );
}
