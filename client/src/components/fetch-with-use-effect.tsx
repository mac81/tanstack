import { useEffect, useState } from "react";

import { fetchData } from "@/lib/fetch-utils";

import type { Product, ProductItem } from "@/types";

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
          <div className="mb-4 text-blue-500">Loading products...</div>
        ) : (
          <>
            {error && <div className="mb-4 text-red-500">Error: {error}</div>}

            {products.length === 0 && !error && (
              <div className="mb-4">No products found for this category.</div>
            )}

            {products.length > 0 && (
              <ul className="space-y-4">
                {products.map((product) => (
                  <li key={product.id} className="border p-3 rounded">
                    <h3 className="font-semibold">{product.title}</h3>
                    {product.images && (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-20 h-20 object-cover mb-2"
                      />
                    )}
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
