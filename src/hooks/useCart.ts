import React from "react";

import type { Product } from "../types";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  total: number;
  totalFormatted: string;
};

export type Cart = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (item: CartItem) => void;
  totalValue: number;
};

/**
 * Find and initialise cart items saved to local storage
 */
let storedCartItems = localStorage.getItem("cartItems");
let initialCartItems: CartItem[] = [];
if (storedCartItems) {
  initialCartItems = JSON.parse(storedCartItems);

  console.log("Retrieved cart items from local storage: ", {
    items: initialCartItems,
  });
}

export default function useCart() {
  const [items, setItems] = React.useState<CartItem[]>(initialCartItems);

  // Persist cart items to local storage when the cart is updated
  React.useEffect(() => {
    console.log("Saving cart items to local storage: ", { items });
    window.localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  // Sum the total value of the cart
  const totalValue = React.useMemo<number>(() => {
    return items.reduce((carry, item: CartItem) => {
      carry += item.price * item.qty;
      return carry;
    }, 0);
  }, [items]);

  // Add a product to the cart
  function addItem(product: Product) {
    const existingProductIndex = items.findIndex(
      (item: CartItem) => item.id === product.id
    );

    // When a product is found in the cart, increment the quantity
    if (existingProductIndex >= 0) {
      let product = items[existingProductIndex];
      let qty = product.qty + 1;
      let total = product.price * qty;

      setItems(
        items.map((item) => {
          if (item.id === product.id) {
            return {
              ...product,
              qty,
              total,
              totalFormatted: total.toFixed(2),
            };
          }

          return item;
        })
      );

      return;
    }

    // No matching product was found, so we'll add one and set the
    // initial order quantity
    setItems([
      ...items,
      {
        ...product,
        qty: 1,
        total: product.price,
        // Storing presentational props within the hook so that logic does not need to
        // be re-implemented in multiple places. i.e. in a real cart, you would have the dropdown menu
        // on every page as well as the dedicated cart page, as well as any widgets shown on product
        // or account pages.
        totalFormatted: product.price.toFixed(2),
      },
    ]);
  }

  // Remove a product from the cart
  function removeItem(product: CartItem) {
    setItems([...items.filter((item) => item.id !== product.id)]);
  }

  // Expose the public variables and methods to the hook consumer
  return {
    items,
    addItem,
    removeItem,
    totalValue,
  };
}
