"use client";
import React from "react";
import { HtmlMarkup } from "@/app/lib/processHtml";
import { FaChevronDown, FaChevronUp, FaEdit, FaPlus } from "react-icons/fa";
import Link from "next/link";
import AllDistributors from "./all-distributors";

//
export default function DistributorsList({ page }: { page: any }) {
  const [faqs, setFaq] = React.useState<any>(page);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  const togView = (index: number, state: any) => {
    const mutd: any[] = [...faqs];
    mutd[index]["is_togged"] = !mutd[index]["is_togged"];
    setFaq(mutd);
  };

  const launchAdd = () => {};
  return (
    <React.Fragment>
      <div className="flex flex-row border-bottom align-items-center px20 py10">
        <span className="spacer align-items-center justify-content-center">
          -
        </span>
        <span className="group-btn">
          <Link href="/admin/distributors/new">
            <FaPlus /> <span className="sm-hide px5">ADD NEW</span>
          </Link>
        </span>
      </div>

      <div className="dashboard-page-content">
        <AllDistributors data={page} />
      </div>
    </React.Fragment>
  );
}
