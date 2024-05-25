import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartQuantity: 0,
    //array of objects with product id and quantity
    cartProducts: [],
  },
  //reducers
  reducers: {
    addToCart: (state, action) => {
      let product = state.cartProducts.find(
        (product) => product.id === action.payload.product_id
      );
      if (product) {
        product.quantity += action.payload.count;
      } else {
        state.cartProducts.push({
          id: action.payload.product_id,
          quantity: action.payload.count,
        });
      }
      state.cartQuantity += action.payload.count;
    },
    removeFromCart: (state, action) => {
      let product = state.cartProducts.find(
        (product) => product.id === action.payload.product_id
      );
      if (product) {
        state.cartQuantity -= product.quantity;
        state.cartProducts = state.cartProducts.filter(
          (product) => product.id !== action.payload.product_id
        );
      }
    },
  },
});

export const actions = cartSlice.actions;

export default cartSlice;
