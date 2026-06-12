import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import CreateUser from "../new-user";


export default async function Page() {
  const user = await getCookie("user");
  return (
    <CreateUser/>
  );
}
