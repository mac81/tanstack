import { Button } from "@/components/ui/button";

import { useProductsQuery } from "./use-products";
import { ProductForm } from "./product-form";
import { ErrorComponent } from "../error";
import { ProductNotFound } from "../product/product-not-found";
import { ProductList } from "../product/product-list";
import { ProductLoader } from "../product/product-loader";

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

      {isLoading && <ProductLoader />}

      {isError && <ErrorComponent error={error?.message} />}

      {!isLoading && !isError && products?.length === 0 && <ProductNotFound />}

      {products && products.length > 0 && (
        <div>
          <div className="space-y-3">
            <ProductList products={products} />
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
