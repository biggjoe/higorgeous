import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import { post } from "@/app/lib/fetchData";
import Link from "next/link";
import DistributorsList from "./ui/list-distributors";

//

//
export default async function Page() {
  const user = await getCookie("user");
  const res = await post({}, "list_distributors");
  console.log(res);
  const page = res.status
    ? res.data
    : {
        title: "Distributors",
        description: "Error fetching page",
      };

  return (
    <>
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <span>Distributors</span>
        </div>
      </div>

      {res.status && <DistributorsList page={page} />}
    </>
  );
}
