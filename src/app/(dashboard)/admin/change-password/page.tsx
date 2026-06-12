import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import { post } from "@/app/lib/fetchData";
import Link from "next/link";
import ChangeForm from "./change-form";

//

//
export default async function Page() {
  const user = await getCookie("user");

  return (
    <>
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <span>FAQ</span>
        </div>
      </div>

  <ChangeForm user={user} />
    </>
  );
}
