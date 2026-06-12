

import { post } from "@/app/lib/fetchData";
import Link from "next/link";
import EditDistributor from "../../ui/edit-distributors";

//
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const par = await params;
  const res = await post({ id: par.id }, "get_faq_details");
  console.log(res);
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

      <EditDistributor data={page} />
    </>
  );
}
