import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import Button from "../button/Button";
import "./collectionitem.scss";

const CollectionItem = ({ item }) => {
  const authCtx = useContext(AuthContext);

  // const addCartItem = () => {
  //   const index = authCtx.cartItems.findIndex(
  //     (cartitem) => cartitem.index === item.index
  //   );
  //   if (index > 0) {
  //     // const items = [...authCtx.cartItems];
  //   }
  //   authCtx.setCartItems((items) => [...items, item]);
  // };
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{ backgroundImage: `url(${item.imageUrl})` }}
      />
      <div className="collection-footer">
        <div className="name">{item.name}</div>
        <div className="price">{item.price}</div>
      </div>
      <Button
        onClick={() =>
          authCtx.cartDispatcher({ type: "addCartItem", payload: item })
        }
        inverted
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default CollectionItem;
