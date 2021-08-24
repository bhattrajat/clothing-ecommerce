import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/CheckoutItem";
import { AuthContext } from "../../context/auth";
import { loadStripe } from "@stripe/stripe-js";
import "./checkout.scss";
const Checkout = () => {
  const authctx = useContext(AuthContext);
  const stripePromise = loadStripe(
    "pk_test_51JMwqTSGZ43n5aWdTPNfq7Y8I34INVfxGyw0hLsJDHtAG6DytKfKECQvulVCI4W1Ipb4gKzu3g6FmUOci1SItfaW00zcN42hcz"
  );

  const createCheckoutSession = async () => {
    console.log("working");
    const stripe = await stripePromise;
    const res = await fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: authctx.cartStore.items }),
    });
    const checkoutSession = await res.json();
    const result = stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };
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

      <button role="link" onClick={createCheckoutSession}>
        Checkout
      </button>
    </section>
  );
};

export default Checkout;
