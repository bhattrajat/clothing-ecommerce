import React, { useEffect, useReducer, useState } from "react";
import { auth, createUserProfile, firestore } from "../firebase/utils";
import cartReducer from "./cartReducer";
import SHOP_DATA from "../data/SHOP_DATA";
export const AuthContext = React.createContext({
  currentUser: null,
  setCurrentUser: () => {},
  cartStore: {},
  cartDispatcher: () => {},
});
const initialState = {
  items: [],
  totalPrice: 0,
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // if (localCartStore) {
  //   console.log("dasda");
  //   console.log(JSON.parse(localCartStore));
  // }
  const [cartStore, cartDispatcher] = useReducer(cartReducer, initialState);
  const value = {
    currentUser,
    setCurrentUser,
    cartStore,
    cartDispatcher,
  };
  useEffect(() => {
    // localStorage.setItem("cartStore", JSON.stringify(cartStore));
    if (currentUser) {
      var docRef = firestore.collection("cart").doc(currentUser.id);
      docRef
        .set(cartStore)
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  }, [cartStore, currentUser]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userSnapShot = await (await createUserProfile(user)).get();
        const doc = await firestore
          .collection("cart")
          .doc(userSnapShot.id)
          .get();
        const cartItems = doc.data();
        if (cartItems) {
          cartDispatcher({ type: "setCartItems", payload: cartItems });
        }
        setCurrentUser(
          {
            id: userSnapShot.id,
            ...userSnapShot.data(),
          }
          // console.log(currentUser)
        );
        // console.log(user.displayName);
      } else {
        setCurrentUser(null);
      }
      await createUserProfile(user);
    });
    return unsubscribe;
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
