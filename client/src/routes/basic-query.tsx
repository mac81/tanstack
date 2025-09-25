import { BackButton } from "@/components/back-button";
import FetchWithReactQuery from "@/components/fetch-with-react-query";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/basic-query")({
  component: BasicReactQuery,
});

function BasicReactQuery() {
  const [category, setCategory] = useState("beauty");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <BackButton />
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Basic React Query Example</h1>
        <p className="mb-4">
          This example shows how React Query simplifies data fetching compared
          to using useEffect.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Select a Category</h2>
        <div className="flex space-x-2 mb-4">
          <Button
            variant={category === "beauty" ? "default" : "outline"}
            onClick={() => setCategory("beauty")}
          >
            Beauty
          </Button>
          <Button
            variant={category === "fragrances" ? "default" : "outline"}
            onClick={() => setCategory("fragrances")}
          >
            Fragrances
          </Button>
          <Button
            variant={category === "furniture" ? "default" : "outline"}
            onClick={() => setCategory("furniture")}
          >
            Furniture
          </Button>
          <Button
            variant={category === "nonexistent" ? "default" : "outline"}
            onClick={() => setCategory("nonexistent")}
          >
            Empty Category
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden shadow-sm">
          <div className="bg-green-100 p-3 font-medium border-b">
            React Query Example
          </div>
          <FetchWithReactQuery category={category} />
        </div>
      </div>

      <div className="mt-8 space-y-4 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold">Key Benefits of React Query</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>No need to manage loading, error, or data states manually</li>
          <li>Automatic request cancellation on component unmount</li>
          <li>Automatic caching and refetching with configurable settings</li>
          <li>No race conditions to worry about</li>
          <li>Much simpler and more declarative API</li>
        </ul>
      </div>
    </div>
  );
}
