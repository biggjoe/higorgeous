import Link from "next/link";
import NewDistributor from "../ui/new-distributors";

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
      <NewDistributor /> {/*  */}
    </>
  );
}
