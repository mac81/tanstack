import { BackButton } from "@/components/back-button";
import ProductSearch from "@/components/product-search";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debounced-search")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6">
        Debounced Search with Tanstack Query
      </h1>

      <div className="mb-8">
        <p className="mb-4">
          This example demonstrates how to use Tanstack Query with debounced
          input to search for products across all categories. The search input
          is debounced to prevent excessive API calls while typing.
        </p>

        <p className="mb-4">
          Tanstack Query automatically manages the loading and error states, and
          caches the results for each search term to avoid unnecessary requests.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Search Products:</h2>
        <ProductSearch />
      </div>
    </div>
  );
}
