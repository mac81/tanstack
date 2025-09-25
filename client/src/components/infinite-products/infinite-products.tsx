import { Button } from "@/components/ui/button";

import { useProductsQuery } from "./use-products";
import { ProductForm } from "./product-form";

export default function InfiniteComments() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProductsQuery();

  const products = data?.pages.flatMap((page) => page.products);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Products ({data?.pages[0].total ?? "-"})
      </h2>

      <ProductForm />

      {isLoading && <p className="mb-4 text-blue-500">Loading products...</p>}

      {isError && (
        <div className="mb-4 text-red-500">
          Error loading products: {error?.message}
        </div>
      )}

      {!isLoading && !isError && products?.length === 0 && (
        <div className="mb-4">No products yet.</div>
      )}

      {products && products.length > 0 && (
        <div>
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product?.id}
                className="flex gap-3 p-3 border rounded-lg bg-white"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                    {product?.images && (
                      <img src={product?.images?.[0]} alt={product?.title} />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-medium">{product?.title}</p>
                  </div>
                  <p className="text-gray-700 mt-1">{product?.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center my-4">
            {hasNextPage && (
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-4 py-2"
              >
                {isFetchingNextPage ? "Loading more..." : "Load More Products"}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
