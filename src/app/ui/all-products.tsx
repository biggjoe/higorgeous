"use client";
import { DatePipe } from "@/app/lib/processHtml";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaCartPlus, FaTrash } from "react-icons/fa6";
import DeleteItem from "./DeleteItem";
import PublishItem from "./PublishItem";

  const FILE_URL = process.env.NEXT_PUBLIC_DOMAIN_ROOT;
export default function ProductList({
  products,
  categories,
  user,
  is_admin,
  is_logged,
  max_grid,
  cat_url,
  is_featured,
  is_shadowed,
  shop,
}: {
  products: any;
  categories?: any;
  user?: any;
  is_admin?: boolean;
  is_logged?: boolean;
  max_grid?: boolean;
  cat_url?: string;
  is_featured?: boolean;
  is_shadowed?: boolean;
  shop?: boolean;
}) {

  console.log("FILE_URL::",FILE_URL)
  const [list, setList] = React.useState<any>(null);
  const offset = React.useRef(0);
  const posts = React.useRef<any>(null);
  useEffect(() => {
    posts.current = products;
    setList(products);
  }, []);
  const handlePush = (list: any) => {
    posts.current = [...posts.current, ...list];
    //setList(posts.current);
  };


  const deleteProduct = async(id:any)=>{
    const res = await deleteProduct(id);
  }
  return (
    <React.Fragment>
      {!products && (
        <div className="absolute-centered">
          <h3>Loading Products...</h3>
        </div>
      )}
      <div className="grid">
        {products && (
          <>
            {products.map((item: any) => (
              <React.Fragment key={item.id}>
                {shop || is_admin && (
                  <div
                    className={`grid-pane ${
                      item.category_url === "serum" ? "purple" : "crimson"
                    } ${is_shadowed ? "shadow-box" : ""}`}
                  >
                   
                    {is_featured && (
                      <span className="feature-cat">FEATURED</span>
                    )}
                    <span
                      className={`product-cat ${
                        item.category_url === "serum" ? "beige" : "crimson"
                      }`}
                    >
                      {item.category_title}
                    </span>
                    <div
                      className="product-image"
                      style={{
                        backgroundImage: ` url(${
                          item.thumb
                            ? process.env.NEXT_PUBLIC_DOMAIN_ROOT + item?.thumb
                            : "/images/product-1.webp"
                        }) `,
                      }}
                    >
                      {/* <Image 
                    height="230"
                    width="260"
                    alt="prod1"
                    src="/images/product-1.webp"
                  /> */}
                    </div>
                    <div className="product-info">
                      <div className={`product-title `}>
                        <span>{item.title}</span>
                        <span className={`product-sub-title`}>
                          {item.sub_title}
                        </span>
                        {shop && (
                          <>
                            <div className="explore-link pt10">
                              <Link
                                href={`${item?.buy_link}`}
                                target="_blank"
                                className="inline-flex align-center  buy"
                              >
                                <FaCartPlus
                                  style={{
                                    fontSize: "17px",
                                    marginRight: "5px",
                                  }}
                                />
                                BUY NOW
                              </Link>
                            </div>
                          </>
                        )}
                      </div>

                      {!is_featured && (
                        <div className="product-desc">
                          {item.description}
                          <div
                            className={`view-more ${
                              item.category_url === "serum"
                                ? "purple"
                                : "crimson"
                            }`}
                          >
                            View more →
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) }
                
                
                {!shop && !is_admin && (
                  <Link
                    href={`/products/v/${item.url}`}
                    className={`grid-pane ${
                      item.category_url === "serum" ? "purple" : "crimson"
                    } ${is_shadowed ? "shadow-box" : ""}`}
                    key={item.id}
                  >

                    {is_featured && (
                      <span className="feature-cat">FEATURED</span>
                    )}
                    <span
                      className={`product-cat ${
                        item.category_url === "serum" ? "beige" : "crimson"
                      }`}
                    >
                      {item.category_title}
                    </span>
                    <div
                      className="product-image"
                      style={{
                        backgroundImage: ` url(${
                          item.thumb
                            ? FILE_URL + item?.thumb
                            : "/images/product-1.webp"
                        }) `,
                      }}
                    >
                      {/* <Image 
                    height="230"
                    width="260"
                    alt="prod1"
                    src="/images/product-1.webp"
                  /> */}
                    </div>
                    <div className="product-info">
                      <div className={`product-title `}>
                        <span>{item.title}</span>
                        <span className={`product-sub-title`}>
                          {item.sub_title}
                        </span>
                      </div>

                      {!is_featured && (
                        <div className="product-desc">
                          {item.description}
                          <div
                            className={`view-more ${
                              item.category_url === "serum"
                                ? "purple"
                                : "crimson"
                            }`}
                          >
                            View more →
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                )}


                
                {(is_admin || shop) && (
                  <div
                    className={`grid-pane ${
                      item.category_url === "serum" ? "purple" : "crimson"
                    } ${is_shadowed ? "shadow-box" : ""}`}
                    key={item.id}
                  >

                      {is_admin && (
                      <span className="admin-span">
                        <Link href={`/admin/products/e/${item.id}`} className="mr5"><FaEdit/> Edit</Link>
                  <span className="mr5">|</span> 
                        <DeleteItem item={item} act="delete" item_label="product" item_id={item.id} />
                      </span>
                    )}
                    {is_featured && (
                      <span className="feature-cat">FEATURED</span>
                    )}
                    <span
                      className={`product-cat ${
                        item.category_url === "serum" ? "beige" : "crimson"
                      }`}
                    >
                      {item.category_title}
                    </span>
                    <div
                      className="product-image"
                      style={{
                        backgroundImage: ` url(${
                          item.thumb
                            ? FILE_URL + item?.thumb
                            : "/images/product-1.webp"
                        }) `,
                      }}
                    >
                      {/* <Image 
                    height="230"
                    width="260"
                    alt="prod1"
                    src="/images/product-1.webp"
                  /> */}
                    </div>
                    <div className="product-info">
                      <div className={`product-title `}>
                        <span>{item.title}</span>
                        <span className={`product-sub-title`}>
                          {item.sub_title}
                        </span>
                      </div>

                      {!is_featured && (
                        <div className="product-desc">
                          {item.description}
                          <div
                            className={`view-more ${
                              item.category_url === "serum"
                                ? "purple"
                                : "crimson"
                            }`}
                          >
                            View more →
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </React.Fragment>
  );
}
