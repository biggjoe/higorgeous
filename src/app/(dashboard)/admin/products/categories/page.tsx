import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import { fetchProductCategories } from "@/app/lib/fetchData";
import CategoryList from "../ui/category-list";

export async function generateMetadata() {
  return {
    title: `About`,
    description: `All About`, // meta description
  };
} /**/
export default async function Page() {
  const user = await getCookie("user");
  const categories = await fetchProductCategories();
  return (
    <CategoryList
      categories={categories}
      is_admin={user && user.role === "admin" ? true : false}
      is_logged={user ? true : false}
      user={user}
    />
  );
}
