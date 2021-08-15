import toggleCart from "./toggleCart";
import addToCartSlice from "./addToCart";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    toggleCart: toggleCart.reducer,
    addToCart: addToCartSlice.reducer,
  },
});

export default store;
