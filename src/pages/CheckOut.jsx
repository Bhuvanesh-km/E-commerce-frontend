import React from "react";
import { useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
  ]);

  const handlePlaceOrder = () => {
    // Logic to place the order goes here
    console.log("Order placed!");
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4"
            >
              <div>
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-gray-500">${item.price}</p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Remove
              </button>
            </div>
          ))}
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
