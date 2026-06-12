import { post } from "@/app/lib/fetchData";
import { HtmlMarkup } from "@/app/lib/processHtml";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
export async function generateMetadata() {
  return {
    title: `Umuoji Progressive Movement - Contact Us`,
    description: `Umuoji Progressive Movement - contact us`, // meta description
  };
} /**/
export default async function Page() {
  const res = await post({ slug: "contact-upm" }, "fetch_page");
  console.log(res);
  const page = res.status
    ? res.data
    : { title: "Contact  UPM", description: "Error fetching page" };
  console.log(page);
  return (
    <>
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <span>Contact us</span>
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
          <Link href="/admin/contact-us/edit">
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
