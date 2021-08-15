import { createSlice } from "@reduxjs/toolkit";
import { toggleCartActions } from "./toggleCart";

const initialCartState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const addToCartSlice = createSlice({
  name: "addToCart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.title,
          price: newItem.price,
          totalPrice: newItem.price,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

//THE THUNK////////////////////////////////
export const sendingData = (cart) => {
  return async (dispatch) => {
    dispatch(
      toggleCartActions.showNotification({
        status: "Sending request...",
        title: "Sending",
        message: "Sending data...",
      })
    );
    const httpRequest = async () => {
      const response = await fetch(
        "https://advanced-redux-237d0-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) throw new Error("Sending failed");

      dispatch(
        toggleCartActions.showNotification({
          status: "Success",
          title: "Success",
          message: "Request Sent",
        })
      );
    };

    try {
      httpRequest();
    } catch (err) {
      dispatch(
        toggleCartActions.showNotification({
          status: "err",
          title: "Error sending data",
          message: "Sending data failed...",
        })
      );
    }
  };
};

export const addToCartActions = addToCartSlice.actions;

export default addToCartSlice;
