import SignIn from '../../components/signin/SignIn';
import SignUp from '../../components/signup/SignUp';
import './auth.scss';
const Auth = () => {
  return (
    <div className="auth">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Auth;
