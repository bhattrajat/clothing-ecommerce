import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51JMwqTSGZ43n5aWdTPNfq7Y8I34INVfxGyw0hLsJDHtAG6DytKfKECQvulVCI4W1Ipb4gKzu3g6FmUOci1SItfaW00zcN42hcz"
);

const StripeCard = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeCard;
