"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaX,
  FaYoutube,
} from "react-icons/fa6";
import "./footer.css";

//
export default function Footer({
  cur_user,
  is_logged,
}: {
  cur_user?: any;
  is_logged?: boolean;
}) {
  //const is_logged = isLogged();
  //const dir = usePathname();
  //const is_admin_dir = dir.startsWith("/admin");
  //const is_account_dir = dir.startsWith("/account");
  return (
    <footer className="footer-main">
      <div className="page-wrap">
        <div className="footer-items">
          <ul className="footer-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>

          <div className="spacer"></div>
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
            </Link>*/}
          </div>
        </div>
      </div>
      <div className="page-wrap">
        <div className="line"></div>
      </div>
      <div className="page-wrap">
        <div className="flex flex-row-resp align-items-center">
          <span className="lowest-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/faq">FAQ</Link>
          </span>
          <span className="spacer"></span>
          <span className="copyright">
            &copy;2025 HiGorgeous. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
