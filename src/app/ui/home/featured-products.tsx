import { fetchFeaturedProducts } from "@/app/lib/fetchData";
import Link from "next/link";
import ProductList from "../all-products";
//
export default async function FeaturedProducts() {
  const products = await fetchFeaturedProducts({ limit: 6 });
  console.log("Prods::",products)
  return (
    <section className="page-width">
      <div className="after-detail">
        <h2 className="text-center">Explore Our Products</h2>
      </div>
      <div className="page-body py0">
        <ProductList
          is_shadowed
          is_featured={true}
          is_admin={false}
          products={products}
        />

        <div className="explore-link py30">
          <Link href="/products">View All Products &rarr; </Link>
        </div>
      </div>
    </section>
  );
}
