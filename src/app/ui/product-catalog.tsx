"use client";
import React from "react";
import { HtmlMarkup } from "../lib/processHtml";
import Link from "next/link";
import Image from "next/image";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export function ProductCatalog({
  products,
  category,
}: {
  products: any;
  category?: any;
}) {
  const [post, setPost] = React.useState<any>([]);
  const [loaded, setLoaded] = React.useState(false);
  const main_tabs = [
    { title: "All", path: null },
    { title: "Lotions", path: "lotions" },
    { title: "Serums", path: "serums" },
    { title: "Creams", path: "creams" },
  ];
  const tabs = [
    { title: "Description", path: "description" },
    { title: "Ingredients", path: "ingredients" },
  ];
  React.useEffect(() => {
    setLoaded(post ? true : false);
    const mutd: any[] = [...products];
    mutd.forEach((obj) => {
      obj.tab = null;
    }); /**/
    setPost(mutd);
  }, []);
  //const [cur_tab, setTab] = React.useState<any>("description");

  console.log("poss::", post);
  const FILE_URL = process.env.NEXT_PUBLIC_DOMAIN_ROOT;

  const [default_tab, setDefTab] = React.useState({
    title: "Description",
    icon: "fa-list",
    path: "description",
  });
  const [default_cat, setDefCat] = React.useState({
    title: "All Products",
    icon: "fa-list",
    path: "",
  });

  const cats: any = {};
  const [cur_tab, setTab] = React.useState<any>({
    title: "Description",
    path: "description",
  });

  const [isMainTogged, setIsMainTogged] = React.useState(false);
  const toggleMainNav = () => {
    const mcur = isMainTogged;
    setIsMainTogged(!mcur);
  };
  const [isTogged, setIsTogged] = React.useState(false);
  const toggleNav = () => {
    const cur = isTogged;
    setIsTogged(!cur);
  };

  const doMainTab = (item: any, index: number) => {
    setTab(item);
    setDefTab(item);
    toggleMainNav();
  };

  const doTab = (item: any, index: number) => {
    const mutd: any[] = [...post];
    mutd[index]["tab"] = item;
    setPost(mutd);
  };

  const togView = (index: number, state: any) => {
    const mutd: any[] = [...products];
    mutd.forEach((obj) => {
      obj.is_togged = false;
    });
    mutd[index]["is_togged"] = !mutd[index]["is_togged"];
    //setFaq(mutd);
  };

  return (
    <React.Fragment>
      <div className="page-body py30">
        <div className={`nav-cover mb20`}>
          <span className="def-sub" onClick={toggleMainNav}>
            <span className="spacer">
              <i className={`fas ${default_tab.icon} pr5 txt-sm`}></i>
              {default_cat.title}
            </span>

            <button onClick={toggleMainNav} className="mnav dark">
              {!isTogged ? <FaChevronDown /> : <FaChevronUp />}
            </button>
          </span>
          <ul className={`category-tab  ${isMainTogged ? "flex" : "none"}`}>
            {main_tabs.map((tab: any, ind: number) => (
              <li key={tab.path}>
                {cats?.path === null || cats?.path === "null" ? (
                  ""
                ) : (
                  <Link
                    href={tab.path ? `/catalog/v/${tab.path}` : "/catalog"}
                    onClick={() => doMainTab(tab, ind)}
                    className={tab.path === category?.slug ? "active" : ""}
                  >
                    {tab.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {post.map((product: any, index: number) => (
          <div
            className="beige px10 pb10 mb20 push-shadow"
            key={product?.url + index}
          >
            <div className="catalog-title">
              <h2>{product?.title}</h2>
              <h3>{product?.sub_title}</h3>
            </div>
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
                          <i
                            className={`fas ${default_tab.icon} pr5 txt-sm`}
                          ></i>
                          {default_tab.title}
                        </span>

                        <button onClick={toggleNav} className="mnav dark">
                          {!isTogged ? <FaChevronDown /> : <FaChevronUp />}
                        </button>
                      </span>
                      <ul
                        className={`category-tab  ${
                          isTogged ? "flex" : "none"
                        }`}
                      >
                        {tabs.map((tab: any) => (
                          <li key={tab.path}>
                            {product?.tab?.path === null ||
                            product?.tab?.path === "null" ? (
                              ""
                            ) : (
                              <button
                                onClick={() => doTab(tab, index)}
                                className={
                                  tab.path === product?.tab?.path
                                    ? "active"
                                    : ""
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
                        product?.tab?.path === null ||
                        !product?.tab?.path ||
                        product?.tab?.path === "description"
                          ? "show"
                          : "hidden-resp"
                      }
                    >
                      <h3>Description</h3>
                      <div className="mb20">
                        <HtmlMarkup word={product?.description} />
                      </div>
                      <h3>Innovation</h3>
                      <div className="mb20">
                        <HtmlMarkup word={product?.innovation} />
                      </div>
                      <h3>Directions For Use</h3>
                      <div className="mb20">
                        <HtmlMarkup word={product?.direction} />
                      </div>
                    </div>
                  {/*   <div
                      className={
                        product?.tab?.path === "direction"
                          ? "show"
                          : "hidden-resp"
                      }
                    >
                      <HtmlMarkup word={product?.direction} />
                    </div> */}

                    <div
                      className={
                        product?.tab?.path === "ingredients"
                          ? "show"
                          : "hidden-resp"
                      }
                    >
                      <HtmlMarkup word={product?.ingredients} />
                    </div>

                    {/*     <div
                      className={
                        product?.tab?.path === "innovation"
                          ? "show"
                          : "hidden-resp"
                      }
                    >
                      <HtmlMarkup word={product?.innovation} />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
