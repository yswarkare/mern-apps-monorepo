import UserLogInSignUp from '../components/ui/UserLogInSignUp';

const Login = () => {

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <div className="w-[85%] sm:w-[60%] md:w-[50%] lg:w-[35%] flex flex-col justify-start items-center">
        <UserLogInSignUp page="login" title='Log In' link="sign-up" />
      </div>
    </div>
  );
};

export default Login;
