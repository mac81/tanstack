import { fetchData } from "@/lib/fetch-utils";

import type { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { ProductLoader } from "./product/product-loader";
import { ErrorComponent } from "./error";
import { ProductNotFound } from "./product/product-not-found";
import { ProductList } from "./product/product-list";

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

      {isLoading && <ProductLoader />}

      {isError && <ErrorComponent error={error.message} />}

      {data?.products.length === 0 && !isError && !isLoading && (
        <ProductNotFound />
      )}

      {isFetching && !isLoading && (
        <div className="mb-4 text-green-500 flex items-center gap-2">
          Updating products <LoaderIcon />
        </div>
      )}

      {data && data.products.length > 0 && (
        <ProductList products={data.products} />
      )}
    </div>
  );
}
