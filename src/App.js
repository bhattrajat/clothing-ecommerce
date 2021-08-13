import HomePage from "./pages/HomePage";
import "./App.css";
import { Switch, Route } from "react-router";
import ShopPage from "./pages/ShopPage";
import Header from "./components/header/Header";
import Auth from "./pages/auth/Auth";
import AuthContextProvider, { AuthContext } from "./context/auth";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import Checkout from "./pages/checkout/checkout";
function App() {
  const authCtx = useContext(AuthContext);
  return (
    <AuthContextProvider>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/shop">
          <ShopPage />
        </Route>
        <Route path="/auth">
          {authCtx.currentUser ? <Redirect to="/" /> : <Auth />}
        </Route>
        <Route path="/checkout">
          {authCtx.currentUser ? <Redirect to="/" /> : <Checkout />}
        </Route>
      </Switch>
    </AuthContextProvider>
  );
}

export default App;
