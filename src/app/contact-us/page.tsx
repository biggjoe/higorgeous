import PageTop from "../ui/page-top";
import React from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaX,
  FaYoutube,
} from "react-icons/fa6";
import { getCookie } from "../lib/auth_base/cookie_auth";
import Form from "./form";
export async function generateMetadata() {
  return {
    title: `Contact Us`,
    description: `Reach out to us`, // meta description
  };
} /**/
export default async function Home() {
  const user = await getCookie("user");
  return (
    <React.Fragment>
      <PageTop
        is_logged={user ? true : false}
        page={{ title: "Contact Us", bg_color: "sky" }}
      />
      <div className="page-wrap">
        <div className="pane-container py30">
          <div className="half-pane white ">
            <div className="margined flex flex-col">
              <h3>UNITED KINGDOM</h3>
              <ul className="grouped-desc">
                {/*   <li>
                  <div className="mb10 bolder caps">Phones</div>
                  <div>212-371-8500 </div>
                  <div>212-371-8555</div>
                </li> */}
                <li>
                  <div className="mb10 bolder caps">Address</div>
                  <div>
                    Fanton UK LTD
                    <br />
                    Unit 3 Brontë Close, Tilbury Town, Essex. <br />
                    Postcode: RM188BH
                  </div>
                </li>
              </ul>

              <ul className="grouped-desc">
                <li>
                  <div className="mb10 bolder caps">EMAIL</div>
                  <div>info@higorgeous.co.uk</div>
                  <div>sales@higorgeous.co.uk</div>
                </li>
                <li>
                  <div className="mb10 bolder caps">SOCIAL</div>
                  <div className="social-links">
                    <Link href="https://www.instagram.com/higorgeous_skincare">
                      <FaInstagram />
                    </Link>
                    <Link href="http://tiktok.com/@higorgeous_cosmetics">
                      <FaTiktok />
                    </Link>
                    <Link href="https://wa.me/2348054927205">
                      <FaWhatsapp />
                    </Link>
                    {/* 
                    <Link href="">
                      <FaFacebook />
                    </Link> */}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="half-pane sky">{/*  <Map /> */}</div>
        </div>

        <div className="pane-container mb30">
          <div className="half-pane sky contact-higorgeous"></div>
          <div className="half-pane white">
            <div className="margined">
              <div className="after-detail">
                <h3>Leave Us A Message</h3>

                <Form />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
