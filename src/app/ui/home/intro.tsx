"use client";
import Link from "next/link";
import SiteHeader from "../header/SiteHeader";

//
export default function Intro({ is_logged }: { is_logged?: boolean }) {
  return (
    <div className="landing-cover">
      <SiteHeader is_home={true} is_logged={is_logged}/>
      {/*         <div className="landing-overlay"></div> */}
      <div className="landing-home">
        <div className="model-side">
          <div className="product-intro">
            <h1>Science-Backed Performance</h1>

            <Link href="/products">EXPLORE &rarr; </Link>
          </div>
        </div>
        <div className="product-side">
          <div className="product-intro sx-show-block md-hide-block">
            {/*  <h1>Natural & Organic Skincare Set</h1> */}
            <h1>Science-Backed Performance</h1>
            <p></p>
            <Link href="/products">EXPLORE</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
