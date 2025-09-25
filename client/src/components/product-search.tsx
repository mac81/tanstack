import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Step 1: Add useQuery to fetch data

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

      {/* Step 2: Handle loading state */}

      {/* Step 3: Handle error state */}

      {/* Step 4: Handle not found state */}

      {/* Step 6: handle background refetching state */}

      {/* Step 5: Display product list if data is available */}
    </div>
  );
}
