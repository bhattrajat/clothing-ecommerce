const cartReducer = (state, action) => {
  const item = action.payload;
  let index;
  switch (action.type) {
    case "addCartItem":
      index = state.items.findIndex((cartItem) => cartItem.id === item.id);
      if (index > -1) {
        return {
          items: [
            ...state.items.slice(0, index),
            {
              ...state.items[index],
              quantity: state.items[index].quantity + 1,
            },
            ...state.items.slice(index + 1),
          ],
          totalPrice: state.totalPrice + item.price,
        };
      } else {
        return {
          items: [...state.items, { ...item, quantity: 1 }],
          totalPrice: state.totalPrice + item.price,
        };
      }
    case "removeCartItem":
      index = state.items.findIndex((cartItem) => cartItem.id === item.id);
      return {
        items: state.items.filter((cartItem) => cartItem.id !== item.id),
        totalPrice: state.totalPrice - item.quantity * item.price,
      };
    case "decreaseQuantity":
      return {
        items: state.items.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }
          return cartItem;
        }),
        totalPrice: state.totalPrice - item.price,
      };
    case "setCartItems":
      return action.payload;

    default:
      return;
  }
};

export default cartReducer;
