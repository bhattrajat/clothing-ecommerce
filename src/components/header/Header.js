import "./header.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { AuthContext } from "../../context/auth";
import { useContext } from "react";
import { auth } from "../../firebase/init";
import Cart from "../cart/cart";

const Header = () => {
  const authCtx = useContext(AuthContext);
  return (
    <header className="header">
      <Link to="/" className="logo-container">
        <Logo />
      </Link>
      <div className="options">
        <Link to="/shop" className="option">
          SHOP
        </Link>
        <Link to="/contact" className="option">
          CONTACT
        </Link>
        {authCtx.currentUser ? (
          <>
            <div onClick={() => auth.signOut()} className="option">
              SIGN OUT
            </div>
            <Cart />
          </>
        ) : (
          <Link to="/auth" className="option">
            SIGN IN
          </Link>
        )}
      </div>
    </header>
  );
};
export default Header;
