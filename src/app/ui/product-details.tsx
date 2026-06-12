"use client";
import React from "react";
import { HtmlMarkup } from "../lib/processHtml";
import Link from "next/link";
import Image from "next/image";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";

export function ProductDetails({
  product,
  user,
  is_admin,
}: {
  product: any;
  user?: any;
  is_admin?: any;
}) {
  const [post, setPost] = React.useState<any>(product);
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setLoaded(post ? true : false);
  }, []);
  //const [cur_tab, setTab] = React.useState<any>("description");
  const tabs = [
    { title: "Description", path: "description" },
    { title: "Direction For Use", path: "direction" },
    { title: "Ingredients", path: "ingredients" },
    { title: "Innovation", path: "innovation" },
  ];
  const FILE_URL = process.env.NEXT_PUBLIC_DOMAIN_ROOT;

  const [default_tab, setDefTab] = React.useState({
    title: "Description",
    icon: "fa-list",
    path: "description",
  });
  const [cur_tab, setTab] = React.useState<any>({
    title: "Description",
    path: "description",
  });

  const [isTogged, setIsTogged] = React.useState(false);
  const toggleNav = () => {
    const cur = isTogged;
    setIsTogged(!cur);
  };

  const doTab = (item: any) => {
    setTab(item);
    setDefTab(item);
    toggleNav();
    console.log("cur_tab::", item);
  };

  return (
    <React.Fragment>
      <div className="page-body py30">
        <div className="product-container  white">
          <div className="product-image-side">
            <div className="product-image-container">
              <img
                src={`${FILE_URL + product?.picture}`}
                alt={product?.title}
              />
            </div>
            {/* <div className="barcode-container">
              <img
                src={`${FILE_URL + product?.barcode_image}`}
                alt={product?.barcode}
              />
            </div> */}
          </div>
          <div className="product-desc-side">
            {/*  <h2>Description</h2>
            <HtmlMarkup word={product?.description} /> */}
            <div className="product-tab-container">
              <div className="product-tab-item-container">
                <div className={`nav-cover`}>
                  <span className="def-sub" onClick={toggleNav}>
                    <span className="spacer">
                      <i className={`fas ${default_tab.icon} pr5 txt-sm`}></i>
                      {default_tab.title}
                    </span>

                    <button onClick={toggleNav} className="mnav dark">
                      {!isTogged ? <FaChevronDown /> : <FaChevronUp />}
                    </button>
                  </span>
                  <ul className={`category-tab  ${isTogged ? "flex" : "none"}`}>
                    {tabs.map((tab: any) => (
                      <li key={tab.path}>
                        {product[tab.path] === null ||
                        product[tab.path] === "null" ? (
                          ""
                        ) : (
                          <button
                            onClick={() => doTab(tab)}
                            className={
                              tab.path === cur_tab?.path ? "active" : ""
                            }
                          >
                            {tab.title}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="product-tab-details-container">
                <div
                  className={
                    cur_tab?.path === "description" ? "show" : "hidden-resp"
                  }
                >
                  <HtmlMarkup word={product?.description} />
                </div>
                <div
                  className={
                    cur_tab?.path === "direction" ? "show" : "hidden-resp"
                  }
                >
                  <HtmlMarkup word={product?.direction} />
                </div>

                <div
                  className={
                    cur_tab?.path === "ingredients" ? "show" : "hidden-resp"
                  }
                >
                  <HtmlMarkup word={product?.ingredients} />
                </div>

                <div
                  className={
                    cur_tab?.path === "innovation" ? "show" : "hidden-resp"
                  }
                >
                  <HtmlMarkup word={product?.innovation} />
                </div>
                <div className="explore-link py20">
                  <Link
                    href={`${product?.buy_link}`}
                    target="_blank"
                    className="inline-flex align-center"
                  >
                    <FaCartPlus
                      style={{ fontSize: "20px", marginRight: "5px" }}
                    />
                    BUY NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
