"use client";
import Link from "next/link";

//
export default function AfterIntro() {
  return (
    <section className="lines-illus">
      <div className="page-body">
        <div className="home-section">
          <div className="after-intro">
            <div className="modeller"></div>
            <div className="descr">
              <div className="after-detail ">
                <h2>Personal Help for Choosing</h2>
                <p>
                  We are lorem ipsum dolor sit amet consectetur. Aliquam turpis
                  ipsum augue varius scelerisque. Integer donec purus sit justo.
                  Quisque enim risus vel convallis congue. Vitae tempor et nam
                  praesent arcu id hendrerit enim tellus.
                </p>
                <Link href="">CHOOSE</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
