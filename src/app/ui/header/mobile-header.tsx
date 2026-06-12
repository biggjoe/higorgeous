"use client";
import Link from "next/link";
import LogOut from "../logout";
import React from "react";
import "./header.css";
import { FaCogs } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";

//
export default function MobileHeader({
  tog_action,
  is_togged,
  cur_user,
  is_logged,
}: {
  tog_action?: any;
  is_togged?: any;
  cur_user?: any;
  is_logged?: boolean;
}) {
  return (
    <ul
      className="mobile-ul-nav"
      style={{ display: is_togged ? "flex" : "none" }} /**/
    >
      <li>
        <Link href="/about" onClick={() => tog_action()}>
          About HiGorgeous
        </Link>
      </li>
      
         {/*{is_logged && (
        <>
          <li>
          <Link href="/admin">
              <FaCogs style={{ color: "orangered" }} />
            </Link>
          </li>
          <li>
            <LogOut button_text="Log Out" class_name="btn-txt" />
          </li>
        </>
      )} */}
      {/**/}
    </ul>
  );
}
