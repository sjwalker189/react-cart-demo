import { products } from "../data/products";

// Return the list of products with an ID for convenience
export default function useProducts() {
  return products.map((product, index) => {
    return {
      id: index + 1,
      ...product,
    };
  });
}
