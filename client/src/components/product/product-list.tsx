import type { ProductItem } from "@/types";

export const ProductList = ({ products }: { products: ProductItem[] }) => {
  return (
    <ul className="space-y-4">
      {products.map((product) => (
        <li key={product.id} className="border p-3 rounded">
          <h3 className="font-semibold">{product.title}</h3>
          {product.images && (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-20 h-20 object-cover mb-2"
            />
          )}
          <p>{product.description}</p>
        </li>
      ))}
    </ul>
  );
};
