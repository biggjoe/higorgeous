import { post } from "@/app/lib/fetchData";
import { HtmlMarkup } from "@/app/lib/processHtml";
export async function generateMetadata() {
  return {
    title: `Privacy Policy`,
    description: `Privacy Policy`, // meta description
  };
} /**/
export default async function Page() {
  const res = await post({ slug: "privacy" }, "fetch_page");
  const page = res.status
    ? res.data
    : { title: "Privacy Policy", description: "Error fetching page" };
  console.log(page);
  return (
    <div className="page-body">
      <div className="header-info-area">
        <h1>{page.title}</h1>
      </div>
      <div className="page-cover shadow p30 blog-page">
        <HtmlMarkup word={page.description} />
      </div>
    </div>
  );
}
