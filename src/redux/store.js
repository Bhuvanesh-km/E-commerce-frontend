import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
// import { thunkMiddleware } from "redux-thunk";
import filteringSlice from "./slices/filteringSlice";
import productsSlice from "./slices/productsSlice";
import paginationSlice from "./slices/paginationSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    filter: filteringSlice.reducer,
    products: productsSlice.reducer,
    pagination: paginationSlice.reducer,
  },
  // middleware: [thunkMiddleware],
});

export default store;
