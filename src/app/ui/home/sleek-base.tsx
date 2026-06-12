"use client";
import Link from "next/link";
import ProductList from "../all-products";
//
export default function SleekBase() {
  return (
    <section className="category-banners">
      <div className="grid">
        <div className="category-pane">
          <div
            className="category-pane-container"
            style={{ backgroundImage: "url(/images/cat-1.webp)" }}
          >
            <div className="bg-overlay"></div>
            <div className="cat-info">
              <h3>Serum</h3>
            </div>
          </div>
        </div>
        <div className="category-pane">
          <div
            className="category-pane-container"
            style={{ backgroundImage: "url(/images/cat-2.webp)" }}
          >
            <div className="bg-overlay"></div>
            <div className="cat-info">
              <h3>Lotion</h3>
            </div>
          </div>
        </div>
        <div className="category-pane">
          <div
            className="category-pane-container"
            style={{ backgroundImage: "url(/images/cat-1.webp)" }}
          >
            <div className="bg-overlay"></div>{" "}
            <div className="cat-info">
              <h3>Serum</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
