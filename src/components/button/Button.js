import "./button.scss";
const Button = ({ text, googleSignIn, inverted, children, ...otherProps }) => {
  return (
    <button
      className={`${inverted ? "inverted " : ""}
      ${googleSignIn ? "google-clr" : ""} button`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
