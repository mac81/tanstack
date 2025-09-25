import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { fetchData } from "@/lib/fetch-utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import type { Product } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { ProductLoader } from "./product/product-loader";
import { ErrorComponent } from "./error";
import { ProductNotFound } from "./product/product-not-found";
import { ProductList } from "./product/product-list";

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", "search", debouncedSearchTerm],
    queryFn: () =>
      fetchData<Product>(`/api/products/search?q=${debouncedSearchTerm}`),
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
      {isLoading && <ProductLoader />}

      {isError && <ErrorComponent error={error.message} />}

      {data?.products.length === 0 && !isError && !isLoading && (
        <ProductNotFound />
      )}

      {data && data.products.length > 0 && (
        <ProductList products={data.products} />
      )}
    </div>
  );
}
