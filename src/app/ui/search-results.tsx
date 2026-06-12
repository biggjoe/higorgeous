"use client";
import { DatePipe } from "@/app/lib/processHtml";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa6";
import DeleteItem from "./DeleteItem";
import PublishItem from "./PublishItem";

export default function SearchResults({
  results,
  max_grid,
  is_featured,
  is_shadowed,
}: {
  results: any;
  max_grid?: boolean;
  is_featured?: boolean;
  is_shadowed?: boolean;
}) {
  const FILE_URL = process.env.NEXT_PUBLIC_SERVER_ROOT;
  const [list, setList] = React.useState<any>(null);
  const offset = React.useRef(0);
  const posts = React.useRef<any>(null);
  useEffect(() => {
    posts.current = results;
    setList(results);
  }, []);
  const handlePush = (list: any) => {
    posts.current = [...posts.current, ...list];
    //setList(posts.current);
  };
  return (
    <React.Fragment>
      {!results && (
        <div className="absolute-centered">
          <h3>Loading Products...</h3>
        </div>
      )}
      <div className="grid">
        {results && (
          <>
            {results.map((item: any) => (
              <Link
                href={`/products/v/${item.url}`}
                className={`grid-pane ${
                  item.category_url === "serum" ? "purple" : "crimson"
                } ${is_shadowed ? "shadow-box" : ""}`}
                key={item.id}
              >
                {is_featured && <span className="feature-cat">FEATURED</span>}
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
                  </div>

                  {!is_featured && (
                    <div className="product-desc">
                      {item.description}
                      <div
                        className={`view-more ${
                          item.category_url === "serum" ? "purple" : "crimson"
                        }`}
                      >
                        View more →
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </React.Fragment>
  );
}
