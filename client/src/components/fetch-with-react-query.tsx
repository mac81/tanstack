export default function FetchWithReactQuery({
  category,
}: {
  category: string;
}) {
  // Step 1: Add useQuery to fetch data

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {category.charAt(0).toUpperCase() + category.slice(1)} Products
      </h2>

      {/* Step 2: Handle loading state */}

      {/* Step 3: Handle error state */}

      {/* Step 4: Handle not found state */}

      {/* Step 6: handle background refetching state */}

      {/* Step 5: Display product list if data is available */}
    </div>
  );
}
