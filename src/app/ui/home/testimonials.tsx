"use client";
import Link from "next/link";
//
export default function Testimonials() {
  return (
    <section className="testimony-section">
      <div className="section-header">
        <h2>What HiGorgeous Users Say</h2>
      </div>
      <div className="grid">
        <div className="category-pane">
          <div className="testimonial-pane-container">
            <div
              className="tester-pic"
              style={{ backgroundImage: "url(/images/tester-1.webp)" }}
            ></div>
            <div className="testimony-message-div">
              "The Flawless Glow Lotion lives up to it's name because in just 3
              weeks my skin is visibly smoother, rejuvenated and the brightening hydration there for all to see "
            </div>
            <div className="tester-name">Nneka Eze</div>
          </div>
        </div>
        <div className="category-pane">
          <div className="testimonial-pane-container">
            <div
              className="tester-pic"
              style={{ backgroundImage: "url(/images/tester-2.webp)" }}
            ></div>
            <div className="testimony-message-div">
              "The Lumi Rebirth Serum is hands down the best I've ever used. It
              transformed my look dramatically. It made my skin visibly softer,
              more hydrated, and glowing in a matter of weeks"
            </div>
            <div className="tester-name">Joan Nelly</div>
          </div>
        </div>
        <div className="category-pane">
          <div className="testimonial-pane-container">
            <div
              className="tester-pic"
              style={{ backgroundImage: "url(/images/tester-3.webp)" }}
            ></div>
            <div className="testimony-message-div">
              "The Radiant Glow Lotion is a miracle skin-brightening lotion
              because it has made my skin to glow and all my dark spots are gone
              and I now look 10 years younger"
            </div>
            <div className="tester-name">Alicia Aidan</div>
          </div>
        </div>
      </div>
    </section>
  );
}
