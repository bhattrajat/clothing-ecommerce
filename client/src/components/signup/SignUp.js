import { useState } from "react";
import { auth, createUserProfile } from "../../firebase/utils";
import Button from "../button/Button";
import FormInput from "../form-input/FormInput";
import "./signup.scss";
const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetInputs = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  const signUpHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfile(user, { displayName });

      // console.log('user after signup', user);
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    }
    resetInputs();
    // Handle Errors here.
  };
  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <h3>Sign up by creating your username and password</h3>
      <form onSubmit={signUpHandler}>
        <FormInput
          type="text"
          id="displayname-signup"
          label="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <FormInput
          type="email"
          id="email-signUp"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          id="password-signUp"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          type="password"
          id="confirm-password-signUp"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button text="Sign up" type="submit">
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
