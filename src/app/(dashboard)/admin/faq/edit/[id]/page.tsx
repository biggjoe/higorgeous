import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import { post } from "@/app/lib/fetchData";
import Link from "next/link";
import FaqEdit from "../../ui/faq-edit";

//
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const par = await params;
  const res = await post({ id: par.id }, "get_faq_details");
  console.log("faq det::", res);
  const page = res.status ? res.data : {};
  return (
    <>
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/faq">FAQ</Link>
          <span>Edit FAQ</span>
        </div>
      </div>

      <FaqEdit data={page} />
    </>
  );
}
