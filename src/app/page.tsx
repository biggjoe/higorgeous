import Link from "next/link";
import SiteHeader from "./ui/header/SiteHeader";
import AfterIntro from "./ui/home/after-intro";
import React from "react";
import Intro from "./ui/home/intro";
import LayeredPanes from "./ui/home/layered-panes";
import { getCookie } from "./lib/auth_base/cookie_auth";
import FeaturesGrid from "./ui/home/features-grid";
import FeaturedProducts from "./ui/home/featured-products";
import SleekBase from "./ui/home/sleek-base";
import DarkBgPane from "./ui/home/dark-bg-pane";
import Testimonials from "./ui/home/testimonials";
import LeaveMessage from "./ui/home/leave-message";
import Missions from "./ui/home/missions";

export default async function Home() {
  const user = await getCookie("user");
  return (
    <React.Fragment>
      <Intro is_logged={user ? true : false} />
      <section className="white">
        <Missions />

        <LayeredPanes />
        <div className="featured-products-bg">
          <FeaturedProducts />{/**/}
        </div>
         <SleekBase /> 
        <FeaturesGrid />
        <DarkBgPane />
        <Testimonials />

        <LeaveMessage />
      </section>
    </React.Fragment>
  );
}
