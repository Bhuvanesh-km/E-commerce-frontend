import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../redux/slices/cartSlice";

const ProductCard = (props) => {
  const [count, setCount] = useState(0);
  const [showFullText, setShowFullText] = useState(false);
  const { product } = props;
  const dispatch = useDispatch();

  return (
    <div className="w-64 my-5 mx-10 border flex flex-col items-center justify-center border-slate-500  rounded-lg ">
      <img
        className="w-52 h-52 object-contain mt-2"
        src={product.image}
        alt="product_img"
      />
      <div className="mt-1">
        <div className="font-bold">
          {product.rating} ⭐ |{" "}
          <span className="font-normal">{product.count}</span>
        </div>
      </div>
      <div className="flex flex-col items-center ">
        <h3
          className="px-4 py-2"
          onClick={() => setShowFullText(!showFullText)}
        >
          {showFullText
            ? product.title
            : product.title.length > 20
            ? product.title.slice(0, 20) + "..."
            : product.title}
        </h3>
        <div className="flex">
          <span>$</span>
          <p className="font-semibold text-rose-500">{product.price}</p>
        </div>
        <div className="flex items-center gap-4 my-2">
          <button
            className="font-semibold text-xs border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-200 transition duration-200 ease-in-out"
            onClick={() => (count === 0 ? 0 : setCount(count - 1))}
          >
            -
          </button>
          <div className="font-semibold">{count}</div>
          <button
            className="font-semibold text-xs border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-200 transition duration-200 ease-in-out"
            onClick={() => setCount(count + 1)}
          >
            +
          </button>
        </div>
        <div className="py-3">
          <button
            onClick={() => {
              if (count === 0) return alert("Please add quantity");
              dispatch(actions.addToCart({ ...product, count: count }));
              setCount(0);
            }}
            className="bg-rose-500 text-white rounded-md px-2 py-1 hover:bg-rose-600 transition duration-200 ease-in-out"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
