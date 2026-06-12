import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import { post } from "@/app/lib/fetchData";
import Link from "next/link";
import UserList from "./user-list";

//

//
export default async function Page() {
  const usr = await post({},"list_accounts");
  const users = usr?.status ? usr.data:[];
  const res = await post({}, "list_faq");

  return (
    <>

 <UserList users={users} />
    </>
  );
}
