import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import { fetchUserDetails, post } from "@/app/lib/fetchData";
import Link from "next/link";
import ChangeForm from "./change-form";

//

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | any }>;
}) {
  const par = await params;
  const user = await fetchUserDetails(par.id);
  console.log("uss::",user)
  return (
 <section className="page-body">
        <div className="page-vertical-pad">
  

  <ChangeForm user={user} />
  </div>
  </section>
  );
}
