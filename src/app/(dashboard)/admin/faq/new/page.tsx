import Link from "next/link";
import FaqNew from "../ui/faq-new";

//
export default async function Page() {
  return (
    <>
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/faq">FAQ</Link>
          <span>New FAQ</span>
        </div>
      </div>

    <FaqNew />  {/*  */}
    </>
  );
}
