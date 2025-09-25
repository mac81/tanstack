import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function ProductForm() {
  const [productTitle, setProductTitle] = useState("");

  // Step 1: Add useMutation to post data

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!productTitle.trim()) return;

    // Step 2: Call the mutation
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        value={productTitle}
        onChange={(e) => setProductTitle(e.target.value)}
        placeholder="Add a product..."
        className="flex-1"
        // Step 3: Disable input and button while posting
      />
      <Button
        type="submit"
        disabled={!productTitle.trim()} // Step 4: Disable button while posting
      >
        {/* Step 5: Display correct text based on mutation state */}
        Post
      </Button>
    </form>
  );
}
