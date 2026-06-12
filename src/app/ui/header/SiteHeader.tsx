"use client";
import React from "react";
import Link from "next/link";
import LogOut from "../logout";
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaTimes, FaUserCog } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { removeCookie } from "@/app/lib/auth_base/cookie_auth";
import "./header.css";

//
export default function SiteHeader({
  is_home,
  is_logged,
  user,
}: {
  is_home?: boolean;
  is_logged?: boolean;
  user?: any;
}) {

  console.log("From Header:::",is_logged)
  const [togged, setTogged] = React.useState(false);
  const do_tog = () => {
    setTogged(!togged);
  };
  const router = useRouter();
  const [query, setQuery] = React.useState<string | any>(null);
  const doSearch = () => {
    if (!query) {
      alert("Type in your query");
      return;
    }
    router.push(`/search/q/${encodeURIComponent(query)}`);
  };


  const doLogout = ()=> {
    setTimeout(async() => {
    await removeCookie("user");
    await removeCookie("access_token");
          console.log("Redirecting now...");
          window.location.href = "/";
    },1000)

  }
  return (
    <React.Fragment>
      <header
        className={
          is_home ? "landing-header absolute" : "landing-header relative"
        }
      >
        <div className="header-inner">
          <div className="logo">
            <Link href="/">Hi Gorgeous</Link>
          </div>
          <div className="spacer"></div>
          <div className="main-nav">
            <ul>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>   
              
            {is_logged && (<li>
              <Link href="#" onClick={doLogout}>
                <FaSignOutAlt className="pr5" /> Log Out
              </Link></li>
            )}
              <li>
                <Link href="/search">
                  <FaSearch className="pr5" /> Search
                </Link>
              </li>
            </ul>
          </div>
          <div className="spacer"></div>
          <div className="header-acts">
       
            
            <span className="mobile-hash">
              <Link href="#" onClick={do_tog}>
                {togged ? <FaTimes /> : <FaBars />}
              </Link>
            </span>
          </div>
        </div>
      </header>
      <div className="mobile-panel" style={{ height: togged ? "100%" : "0" }}>
        <div className="mobile-nav">
          <div className="mobile-header-inner">
            <div className="logo">
              <Link href="/" onClick={do_tog}>
                Hi Gorgeous
              </Link>
            </div>
            <div className="spacer"></div>
            <span className="mobile-hash">
              <Link href="#" onClick={do_tog}>
                {togged ? <FaTimes /> : <FaBars />}
              </Link>
            </span>
          </div>
          <ul>
            <li>
              <div className="search-cover">
                <div className="site-search-input-container">
                  <input
                    type="search"
                    placeholder="Search Products..."
                    name="query"
                    onChange={(e) => setQuery(e.target.value)}
                    className="site-search-input"
                  />
                  {query && query.length > 0 && (
                    <button
                      aria-label="Search"
                      onClick={doSearch}
                      className="search-btn"
                    >
                      <FaSearch />
                    </button>
                  )}
                </div>
              </div>
            </li>
            <li>
              <Link href="/" onClick={do_tog}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={do_tog}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/products" onClick={do_tog}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/contact-us" onClick={do_tog}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" onClick={do_tog}>
                Frequently Asked Questions
              </Link>
            </li>
            <li>
              <Link href="/shop" onClick={do_tog}>
                Shop
              </Link>
            </li>
             {is_logged && (
            <li> 
              <Link href="#" onClick={doLogout}>
                <FaSignOutAlt className="pr5" /> Log Out
              </Link>
           
            </li>)} 
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
