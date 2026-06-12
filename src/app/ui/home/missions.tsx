"use client";
import Link from "next/link";
//
export default function Missions() {
  return (
    <section className="missions-section">
      <div className="grid">
        <div className="category-pane">
          <div className="mission-pane-container">
            <div
              className="tester-pic"
              style={{ backgroundImage: "url(/images/tester-1.webp)" }}
            ></div>
            <div className="mission-message-div">
              <div className="mission-header">
                Clinically Proven Ingredients
              </div>
              Backed by dematological research -- like retinol, nlacinamide &
              peptides
            </div>
          </div>
        </div>
        <div className="category-pane">
          <div className="mission-pane-container">
            <div
              className="tester-pic"
              style={{ backgroundImage: "url(/images/tester-2.webp)" }}
            ></div>
            <div className="mission-message-div">
              <div className="mission-header">Clean, Conscious Formulas</div>
              Vegan, Cruelty-free, No parabens, sultates, or artificial
              fragrances
            </div>
          </div>
        </div>
        <div className="category-pane">
          <div className="mission-pane-container">
            <div
              className="tester-pic"
              style={{ backgroundImage: "url(/images/tester-3.webp)" }}
            ></div>
            <div className="mission-message-div">
              <div className="mission-header">Visible Results</div>
             70% of users saw smoother, glossier and brighter skin in 2 weeks
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
