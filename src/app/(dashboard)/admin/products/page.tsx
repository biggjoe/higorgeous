import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import { fetchProductCategories, fetchProducts } from "@/app/lib/fetchData";

import ListPage from "./ui/product-list";

export async function generateMetadata() {
  return {
    title: `Products`,
    description: `All Products`, // meta description
  };
} /**/
export default async function Page() {
  const user = await getCookie("user");
  const categories = [
    { slug: "../", title: "All", id: -1 },
    ...(await fetchProductCategories()),
  ];
let list = await fetchProducts({
    is_admin: user && user.role === "admin" ? true : false,
  });
  const push_more = (more: any) => {
    list = [list, ...more];
  };

  return (<>

     
    <ListPage
      list={list}
      categories={categories}
      is_admin={user && user.role === "admin" ? true : false}
      is_logged={user ? true : false}
      user={user}
    /></>
  );
}
