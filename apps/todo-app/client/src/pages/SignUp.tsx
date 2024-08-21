import UserLogInSignUp from '../components/ui/UserLogInSignUp';

const SignUp = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <div className="w-[85%] sm:w-[60%] md:w-[50%] lg:w-[35%] flex flex-col justify-start items-center">
        <UserLogInSignUp page="sign-up" title="Sign Up" link="login" />
      </div>
    </div>
  );
};

export default SignUp;
