import React, { useEffect, useReducer, useState } from "react";
import { auth, createUserProfile } from "../firebase/init";
import cartReducer from "./cartReducer";
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
  const localCartStore = localStorage.getItem("cartStore");
  console.log(localCartStore);
  // if (localCartStore) {
  //   console.log("dasda");
  //   console.log(JSON.parse(localCartStore));
  // }
  const [cartStore, cartDispatcher] = useReducer(
    cartReducer,
    localCartStore ? JSON.parse(localCartStore) : initialState
  );
  const value = {
    currentUser,
    setCurrentUser,
    cartStore,
    cartDispatcher,
  };
  useEffect(() => {
    localStorage.setItem("cartStore", JSON.stringify(cartStore));
  }, [cartStore]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userSnapShot = await (await createUserProfile(user)).get();
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
