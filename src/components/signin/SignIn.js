import { useContext, useState } from 'react';
import { signInWithGoogle, auth } from '../../firebase/init';
import Button from '../button/Button';
import FormInput from '../form-input/FormInput';
import { AuthContext } from '../../context/auth';
import './signin.scss';
import { useHistory } from 'react-router-dom';
const SignIn = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const history = useHistory();
  // const authCtx = useContext(AuthContext);

  const signInSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(email);
    // console.log(password);
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      history.push('/');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('No account found using provided email');
      }
      else {
        alert(error.code);
      }
    }
  };
  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <h3>Sign in with your email and password</h3>
      <form onSubmit={signInSubmitHandler}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          id="signInEmail"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          id="signInPassword"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="buttons">
          <Button type="submit">Sign In</Button>
          <Button onClick={signInWithGoogle} googleSignIn={true}>
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
