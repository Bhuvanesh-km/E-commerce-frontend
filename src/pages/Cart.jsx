import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../redux/slices/cartSlice";
import URL from "../urlConfig";
import axios from "axios";

axios.defaults.withCredentials = true;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.cartProducts);
  const products = useSelector((store) => store.products.products);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = products.reduce((acc, item) => {
      const product = cartItems.find((cartItem) => cartItem.id === item.id);
      if (product) {
        return acc + item.price * product.quantity;
      }
      return acc;
    }, 0);
    totalAmount.toFixed(2);
    setTotalAmount(total);
  }, [cartItems, products]);

  const dispatch = useDispatch();

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const paymentResp = await axios.post(URL.CHECKOUT_URL, {
      productsArray: cartItems,
      priceAtBooking: totalAmount,
    });
    console.log(paymentResp);
    const { id, currency, amount } = paymentResp.data.data;
    console.log("id", id, "currency", currency, "amount", amount);
    const options = {
      key: "rzp_test_TJCaQMtEWOPYz2", // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: currency,
      name: "E-commerce Site",
      description: "Test Transaction",
      image: "",
      order_id: id,
      callback_url: URL.VERIFY_PAYMENT_URL,
      // notes: {
      //   address: "Razorpay Corporate Office",
      // },
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      theme: {
        color: "#3399cc",
      },
    };
    console.log("options", options);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

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
          <p>Total: ${totalAmount}</p>
          <p>Shipping: $ 10</p>
          <p>Grand Total: $ {totalAmount + 10}</p>
          <hr />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={displayRazorpay}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
