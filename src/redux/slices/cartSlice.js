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
        (product) => product.id === action.payload.id
      );
      if (product) {
        product.quantity++;
      } else {
        state.cartProducts.push({ id: action.payload.id, quantity: 1 });
      }
      state.cartQuantity++;
    },
    deleteFromCart: (state, action) => {
      let product = state.cartProducts.find(
        (product) => product.id === action.payload.id
      );
      if (product.quantity > 1) {
        product.quantity--;
      } else {
        state.cartProducts = state.cartProducts.filter(
          (product) => product.id !== action.payload.id
        );
      }
      state.cartQuantity--;
    },
    removeFromCart: (state, action) => {
      state.cartQuantity--;
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const actions = cartSlice.actions;

export default cartSlice;
