"use client";
import Link from "next/link";

//
export default function LayeredPanes() {
  return (
    <section className="feature-linex">
      <section className="page-width">
        <section className="home-section">
          <div className="pane-container">
            <div className="half-pane top-lift beige">
              <div className="margined">
                <div className="after-detail">
                  <h2>Elevate Your Beauty Routine</h2>
                  <p>
                    Our science-backed products are here to help you discover
                    inspiring looks and try game changing products.
                    <br />
                    Your skin gets more than temporary fixes — it receives
                    ongoing care backed by science and designed for lasting
                    beauty.
                  </p>
                  <Link href="/products">CHOOSE ONE</Link>
                </div>
              </div>
            </div>
            <div className="half-pane low-lift sky model-two-flipped"></div>
          </div>
        </section>
      </section>
    </section>
  );
}
