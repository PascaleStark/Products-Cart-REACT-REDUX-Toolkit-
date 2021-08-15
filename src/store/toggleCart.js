import { createSlice } from "@reduxjs/toolkit";

const initialToggleState = { isShown: true, notification: null };
const toggleCart = createSlice({
  name: "toggleCart",
  initialState: initialToggleState,
  reducers: {
    toggle(state) {
      state.isShown = !state.isShown;
    },
    showNotification(state, action) {
      state.notification = {
        message: action.payload.message,
        status: action.payload.status,
        title: action.payload.title,
      };
    },
  },
});

export const toggleCartActions = toggleCart.actions;

export default toggleCart;
