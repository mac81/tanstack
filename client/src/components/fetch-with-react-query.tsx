import { fetchData } from "@/lib/fetch-utils";

import type { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

export default function FetchWithReactQuery({
  category,
}: {
  category: string;
}) {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchData<Product>(`/api/products/category/${category}`),
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {category.charAt(0).toUpperCase() + category.slice(1)} Products
      </h2>

      {isLoading && (
        <div className="mb-4 text-blue-500">Loading products...</div>
      )}

      {isError && (
        <div className="mb-4 text-red-500">Error: {error.message}</div>
      )}

      {data?.products.length === 0 && !isError && !isLoading && (
        <div className="mb-4">No products found for this category.</div>
      )}

      {isFetching && !isLoading && (
        <div className="mb-4 text-green-500 flex items-center gap-2">
          Updating products <LoaderIcon />
        </div>
      )}

      {data && data.products.length > 0 && (
        <ul className="space-y-4">
          {data.products.map((product) => (
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
    </div>
  );
}
