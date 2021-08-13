import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import Button from "../../button/Button";
import CartItem from "../cart-item/CartItem";
import "./cart-dropdown.scss";
import { useHistory } from "react-router-dom";
const CartDropdown = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  let output = <span>Your cart is empty</span>;
  if (authCtx.cartStore.items.length > 0) {
    output = authCtx.cartStore.items.map((item) => (
      <li key={item.id}>
        <CartItem item={item} />
      </li>
    ));
  }
  return (
    <div className="cart-dropdown">
      <ul className="cart-items">{output}</ul>
      <Button
        onClick={() => {
          props.onCheckoutClick();
          history.push("/checkout");
        }}
      >
        Go to checkout
      </Button>
    </div>
  );
};

export default CartDropdown;
