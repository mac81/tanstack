import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { fetchData } from "@/lib/fetch-utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import type { Product } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", "search", debouncedSearchTerm],
    queryFn: () =>
      fetchData<Product>(
        `https://dummyjson.com/products/search?q=${debouncedSearchTerm}`
      ),
    enabled: !!debouncedSearchTerm,
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button
          onClick={() => setSearchTerm("")}
          variant="outline"
          disabled={!searchTerm}
        >
          Clear
        </Button>
      </div>

      {!debouncedSearchTerm && (
        <div className="p-4 text-center text-gray-500 border border-dashed rounded-md">
          Start typing to search for posts...
        </div>
      )}
      {isLoading && (
        <div className="mb-4 text-blue-500">Loading products...</div>
      )}

      {isError && (
        <div className="mb-4 text-red-500">Error: {error.message}</div>
      )}

      {data?.products.length === 0 && !isError && !isLoading && (
        <div className="mb-4">No products found for this category.</div>
      )}

      {data && data.products.length > 0 && (
        <ul className="space-y-4">
          {data.products.map((product) => (
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
    </div>
  );
}
