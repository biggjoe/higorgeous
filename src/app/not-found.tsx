import React from "react";
import Link from "next/link";
import PageTop from "./ui/page-top";
export default function Home() {
  return (
    <React.Fragment>
      <PageTop page={{ title: "Page Not Found", url: "/" }} />
      <div className="page-body">
        <div className="py30 flex flex-col align-items-center justify-content-center">
          <div className="after-detail">
            <h3 className="flex text-center">
              The page you are looking for does not exist
            </h3>
            <div></div>
            <div className="flex text-center justify-content-center align-items-center">
              <Link href="/">Go Home</Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
