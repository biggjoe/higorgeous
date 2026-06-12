"use client";
import React from "react";
import Link from "next/link";

//
export default function DarkBgPane() {
  return (
    <section className="dark-bg-pane">
      <div className="page-body py30">
        <div className="after-intro">
          <div className="amply-push"></div>
          <div className="descr">
            <div className="after-detail color-white">
              <h2>Personal Help for Choosing</h2>
              <p>
                At HiGorgeous, every product is developed with dermatological
                science at its core.
                <br />
                We deliver targeted Solutions for Real Skin Concerns tailored
                for specific skin’s needs.
                <br />
                Your skin gets more than temporary fixes — it receives ongoing
                care backed by science and designed for lasting beauty.
              </p>
              <Link href="/products">CHOOSE</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
