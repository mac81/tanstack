export interface Product {
  limit: number;
  skip: number;
  total: number;
  products: ProductItem[];
}

export interface ProductItem {
  title: string;
  description: string;
  id: number;
  images: string[];
}
