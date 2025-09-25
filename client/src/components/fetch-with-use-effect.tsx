import { useEffect, useState } from "react";

import { fetchData } from "@/lib/fetch-utils";

import type { Product, ProductItem } from "@/types";
import { ProductList } from "./product/product-list";
import { ProductNotFound } from "./product/product-not-found";
import { ErrorComponent } from "./error";
import { ProductLoader } from "./product/product-loader";

export default function FetchWithUseEffect({ category }: { category: string }) {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setIsLoading(true);

    async function fetchProducts() {
      try {
        const data = await fetchData<Product>(
          `/api/products/category/${category}`
        );

        setProducts(data.products);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {category.charAt(0).toUpperCase() + category.slice(1)} Products
      </h2>

      <div>
        {isLoading ? (
          <ProductLoader />
        ) : (
          <>
            {error && <ErrorComponent error={error} />}

            {products.length === 0 && !error && <ProductNotFound />}

            {products.length > 0 && <ProductList products={products} />}
          </>
        )}
      </div>
    </div>
  );
}
