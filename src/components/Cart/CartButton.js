import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { toggleCartActions } from "../../store/toggleCart";
import { useSelector } from "react-redux";

const CartButton = (props) => {
  const totalAmount = useSelector((state) => state.addToCart.totalQuantity);
  const dispatch = useDispatch();
  const toggleCartHandler = () => dispatch(toggleCartActions.toggle());
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalAmount}</span>
    </button>
  );
};

export default CartButton;
