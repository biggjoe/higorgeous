"use client";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function TopNav({ page }: { page: string }) {
  return (
    <nav className="dashboard-header">
      <div className="dashboard-content-wrapper">
        <div className="dashboard-logo">
          <Link href="/">
            <Image
              aria-hidden
              src="/logo.png"
              alt="Logo"
              width={222}
              height={55}
            />
          </Link>
        </div>

        <span className="spacer"></span>
        <ul className="header-nav">
          <li>
            <Link href="/articles">Articles</Link>
          </li>
          <li>
            <Link href="#">
              <FaUserCircle style={{ fontSize: "25px" }} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
