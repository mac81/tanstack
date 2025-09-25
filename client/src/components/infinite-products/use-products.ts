import { fetchData, postData } from "@/lib/fetch-utils";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

import type { Product, ProductItem } from "@/types";

export function useProductsQuery() {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) =>
      fetchData<Product>(`/api/products?skip=${pageParam}`),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.skip <= lastPage.total
        ? lastPage.skip + lastPage.limit
        : undefined,
  });
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: { title: string }) => {
      return postData<{ product: ProductItem }>(
        "/api/products/add",
        newProduct
      );
    },
    onSuccess: async (product) => {
      console.log("Product created:", product);

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useCreateProductMutationOptimistic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: { title: string }) => {
      return postData<{ product: ProductItem }>(
        "/api/products/add",
        newProduct
      );
    },
    onSuccess: async ({ product }) => {
      console.log("Product created:", product);

      // Cancel any outgoing refetches to avoid them overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ["products"] });

      // Update the query cache with the new comment so we don't have to wait for the refetch
      queryClient.setQueryData<InfiniteData<Product, number | undefined>>(
        ["products"],
        (state) => {
          // Add the new product to the first page of results
          const firstPage = state?.pages[0];

          if (firstPage) {
            return {
              ...state,
              pages: [
                {
                  ...firstPage,
                  total: firstPage.total + 1,
                  products: [product, ...firstPage.products],
                },
                ...state.pages.slice(1),
              ],
            };
          }
          return state;
        }
      );
    },

    // You can still invalidate the query afterwards but it's not really necessary
  });
}
