"use client";
import img from "next/image";
import Link from "next/link";

//
export default function FeaturesGrid() {
  return (
    <div className="pane-container py30">
      <div className="half-pane  py30 px30">
        <div className="features-grid">
          <div className="features-grid-pane">
            <div className="grid-illustration">
              <img src="/images/a_cruelty_free.svg" alt="Cruelty Free" />
            </div>
            <span className="grid-title">Cruelty Free</span>
          </div>
          <div className="features-grid-pane">
            <div className="grid-illustration">
              <img
                src="/images/a_delicate_formula.svg"
                alt="Delicate Formula"
              />
            </div>
            <span className="grid-title">Delicate Formula</span>
          </div>
          <div className="features-grid-pane">
            <div className="grid-illustration">
              <img
                src="/images/a_safe_for_sensitive_skin.svg"
                alt="safe_for_sensitive_skin"
              />
            </div>
            <span className="grid-title">Safe For Sensitive Skin</span>
          </div>
          <div className="features-grid-pane">
            <div className="grid-illustration">
              <img
                src="/images/a_sustainable_packaging.svg"
                alt="sustainable_packaging"
              />
            </div>
            <span className="grid-title">Sustainable Packaging</span>
          </div>
        </div>
      </div>
    </div>
  );
}
