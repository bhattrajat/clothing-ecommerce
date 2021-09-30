import { useContext, useEffect, useState } from "react";
import { ReactComponent as CartIcon } from "../../assets/shopping-bag.svg";
import { AuthContext } from "../../context/auth";
import CartDropdown from "./cart-dropdown/CartDropdown";
import "./cart.scss";
const Cart = () => {
  const [isCartDropDownOpen, setIsCartDropDownOpen] = useState(false);
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  return (
    <>
      <div
        onClick={() =>
          setIsCartDropDownOpen((isCartDropDownOpen) => !isCartDropDownOpen)
        }
        className="cart-icon"
      >
        <CartIcon className="shopping-icon" />
        <span className="item-count">{authCtx.cartStore.items.length}</span>
      </div>
      {isCartDropDownOpen ? (
        <CartDropdown
          onCheckoutClick={() => {
            setIsCartDropDownOpen(false);
          }}
        />
      ) : null}
    </>
  );
};

export default Cart;
