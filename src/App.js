import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toggleCartActions } from "./store/toggleCart";
import { sendingData } from "./store/addToCart";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import React from "react";

let initial = true;

function App() {
  const isShown = useSelector((state) => state.toggleCart.isShown);
  const cart = useSelector((state) => state.addToCart);
  const notification = useSelector((state) => state.toggleCart.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }

    dispatch(sendingData(cart));
  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isShown && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
