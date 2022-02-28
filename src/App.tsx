import React from 'react';
import ProductsList from './components/ProductsList';
import Cart from './components/Cart';
import useCart from './hooks/useCart';
import './App.css';

function App() {
  /**
   * In a more complete solution, I would opt to use the context API for providing
   * the cart to all child views when using react-router. For this exercise, I have opted
   * for simplicity by lifting the state to the parent component.
   */
  const cart = useCart();

  return (
   <div className="p-8">
      <h1 className="text-4xl mb-8">Development Test</h1>

      <div className="max-w-[720px]">
        <h2 className="font-bold text-2xl mb-3">Products</h2>
        <ProductsList cart={cart} />

        <hr className="my-8" />

        <h2 className="font-bold text-2xl mb-3">My Cart</h2>
        <Cart cart={cart} />
      </div>
   </div>
  );
}

export default App;
