import Link from "next/link";

export async function generateMetadata() {
  return {
    title: `Admin Dashboard`,
    description: `Admin Dashboard`, // meta description
  };
} /**/
export default async function Page() {
  return <div>Dashboard</div>;
}
