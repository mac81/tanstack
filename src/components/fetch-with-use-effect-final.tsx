import { useEffect, useState } from "react";

import { fetchData } from "@/lib/fetch-utils";

import type { Product, ProductItem } from "@/types";

export default function FetchWithUseEffectFinal({
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
          `https://dummyjson.com/products/category/${category}`
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
          <div className="mb-4 text-blue-500">Loading products...</div>
        ) : (
          <>
            {error && <div className="mb-4 text-red-500">Error: {error}</div>}

            {products?.length === 0 && !error && (
              <div className="mb-4">No products found for this category.</div>
            )}

            {products && products.length > 0 && (
              <ul className="space-y-4">
                {products.map((product) => (
                  <li key={product.id} className="border p-3 rounded">
                    <h3 className="font-semibold">{product.title}</h3>
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-20 h-20 object-cover mb-2"
                    />
                    <p>{product.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
