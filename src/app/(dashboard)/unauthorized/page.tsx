import PageTop from "@/app/ui/page-top";
import Link from "next/link";
import { FaArrowCircleRight, FaExclamationTriangle } from "react-icons/fa";

export async function generateMetadata() {
  return {
    title: `Admin`,
    description: `All Admin`, // meta description
  };
} /**/
export default async function Page() {
  return (
    <>
      <div
        className="abs-middle abs-centered absolute-centered"
        style={{ minHeight: "300px", paddingTop: "50px" }}
      >
        <div className="flex flex-col justify-content-center">
          <div className="mb20">
            <h1 className="flex align-items-center mb20">
              <FaExclamationTriangle
                style={{ fontSize: "40px", color: "red", marginRight: "15px" }}
              />
              Access Denied!
            </h1>
            <h3>You are not authorized to visit that link</h3>
          </div>
          <Link
            className="btn btn-regula inline-flex align-items-center br-5"
            href="/login"
          >
            <span className="mr10"> Please Log In to Continue</span>{" "}
            <FaArrowCircleRight />
          </Link>
        </div>
      </div>
    </>
  );
}
