import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/CheckoutItem";
import { AuthContext } from "../../context/auth";
import StripeCard from "../../stripe/Card-Minimal";
import "./checkout.scss";
const Checkout = () => {
  const authctx = useContext(AuthContext);
  return (
    <section className="checkout-page">
      <header className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </header>
      {authctx.cartStore.items.map((cartItem) => (
        <CheckoutItem key={cartItem.id} item={cartItem} />
      ))}
      <div className="total">Total: $ {authctx.cartStore.totalPrice}</div>
      <StripeCard />
    </section>
  );
};

export default Checkout;
