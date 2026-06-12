import Link from "next/link";
export async function generateMetadata() {
  return {
    title: `Ndi Nze`,
    description: `All Ndi Nze`, // meta description
  };
} /**/
export default async function Page() {
  return (
    <>
      <div className="dashboard-page-title">Settings</div>
      <div className="dashboard-page-content">NZE</div>
    </>
  );
}
