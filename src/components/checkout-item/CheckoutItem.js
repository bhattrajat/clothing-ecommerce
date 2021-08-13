import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import "./checkout-item.scss";
const CheckoutItem = ({ item }) => {
  const authCtx = useContext(AuthContext);
  const decreaseQuantityActionType =
    item.quantity > 1 ? "decreaseQuantity" : "removeCartItem";
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={item.imageUrl} alt="" />
      </div>
      <span className="name">{item.name}</span>
      <span className="quantity">
        <button
          onClick={() =>
            authCtx.cartDispatcher({
              type: decreaseQuantityActionType,
              payload: item,
            })
          }
          className="decrease"
        >
          &#10094;
        </button>
        {item.quantity}
        <button
          onClick={() =>
            authCtx.cartDispatcher({ type: "addCartItem", payload: item })
          }
          className="increase"
        >
          &#10095;
        </button>
      </span>
      <span className="price">{item.price}</span>
      <div
        className="remove-button"
        onClick={() =>
          authCtx.cartDispatcher({
            type: "removeCartItem",
            payload: item,
          })
        }
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
