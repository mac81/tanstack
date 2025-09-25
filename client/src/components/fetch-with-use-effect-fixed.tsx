import { useEffect, useState } from "react";

import { fetchData } from "@/lib/fetch-utils";

import type { Product, ProductItem } from "@/types";
import { ProductLoader } from "./product/product-loader";
import { ErrorComponent } from "./error";
import { ProductNotFound } from "./product/product-not-found";
import { ProductList } from "./product/product-list";

export default function FetchWithUseEffectFixed({
  category,
}: {
  category: string;
}) {
  const [products, setProducts] = useState<ProductItem[]>(); // Fix 3: Initialize as undefined
  const [isLoading, setIsLoading] = useState(true); // Fix 2: Initialize as true
  const [error, setError] = useState<string>();

  // Fix 1: Add ignore flag to prevent state updates after unmount
  useEffect(() => {
    let ignore = false;

    setIsLoading(true);

    async function fetchProducts() {
      try {
        const data = await fetchData<Product>(
          `/api/products/category/${category}`
        );

        if (!ignore) {
          setProducts(data.products);
          setError(undefined); // Fix 4: Clear previous errors on success
        }
      } catch (error) {
        if (ignore) {
          console.error("Fetch error:", error);
          setError("Failed to fetch products");
          setProducts(undefined); // Fix 4: Clear previous data on error
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      ignore = true;
    };
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

            {products?.length === 0 && !error && <ProductNotFound />}

            {products && products.length > 0 && (
              <ProductList products={products} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
