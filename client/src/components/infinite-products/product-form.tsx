import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

import { useCreateProductMutation } from "./use-products";

export function ProductForm() {
  const [productTitle, setProductTitle] = useState("");

  const mutation = useCreateProductMutation();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!productTitle.trim()) return;

    mutation.mutate(
      { title: productTitle },
      {
        onSuccess: () => {
          setProductTitle("");
          toast.success("Product posted successfully!");
        },
        onError: () => {
          toast.error("Failed to post product. Please try again.");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        value={productTitle}
        onChange={(e) => setProductTitle(e.target.value)}
        placeholder="Add a product..."
        className="flex-1"
        disabled={mutation.isPending}
      />
      <Button
        type="submit"
        disabled={!productTitle.trim() || mutation.isPending}
      >
        {mutation.isPending ? "Posting..." : "Post"}
      </Button>
    </form>
  );
}
