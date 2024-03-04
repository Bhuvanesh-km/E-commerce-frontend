import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../redux/slices/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.cartProducts);
  const products = useSelector((store) => store.products.products);

  const dispatch = useDispatch();

  const deleteFromCart = (id) => {
    dispatch(actions.removeFromCart({ id }));
  };

  const productsInCart = cartItems.map((item) => {
    const product = products.find((product) => product.id === item.id);
    return { ...product, quantity: item.quantity };
  });

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="grid grid-cols-3 gap-4">
        {/* Cart items */}
        <div className="col-span-2">
          {productsInCart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {productsInCart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-6 mb-4 border-b border-gray-300 py-4"
                >
                  <div>
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <p className="text-gray-500">${item.price}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-gray-500">
                      Total: ${item.price * item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteFromCart(item.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Cart summary */}
        <div className="bg-gray-100 p-4 h-max">
          <h2 className="text-lg font-bold mb-2">Cart Summary</h2>
          {/* Render cart summary here */}
          <p>Total items: {cartItems.length}</p>
          <p>
            Total: $
            {productsInCart.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            )}
          </p>
          <p>Shipping: $10</p>
          <p>
            Grand Total: $
            {productsInCart.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            ) + 10}
          </p>
          <hr />
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
