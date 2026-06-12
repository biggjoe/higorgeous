import { post } from "@/app/lib/fetchData";
import { HtmlMarkup } from "@/app/lib/processHtml";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
export async function generateMetadata() {
  return {
    title: `Terms`,
    description: `Terms`, // meta description
  };
} /**/
export default async function Page() {
  const res = await post({ slug: "terms" }, "fetch_page");
  console.log(res);
  const page = res.status
    ? res.data
    : { title: "Terms", description: "Error fetching page" };
  console.log(page);
  return (
    <>
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <span>Terms</span>
        </div>
      </div>

      <div className="flex flex-row border-bottom align-items-center px20 py10">
        <span className="group-btn">
          <Link href="#">
            <span className="sm-hide px5">Publish</span>
          </Link>
        </span>
        <span className="spacer align-items-center justify-content-center">
          -
        </span>
        <span className="group-btn">
          <Link href="/admin/terms/edit">
            <FaEdit /> <span className="sm-hide px5">Edit</span>
          </Link>
        </span>
      </div>

      <div className="dashboard-page-content">
        <HtmlMarkup word={page.description} />
      </div>
    </>
  );
}
