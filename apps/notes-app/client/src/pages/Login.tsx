import { object, string } from 'yup'
import SignUpOrLogin from "../components/SignUpOrLogIn";

const userProps = {
  username: "Email ID or Username or Mobile Number",
  password: "Password",
}

const userSchema = object({
  username: string().required(),
  password: string().required(),
})

const Login = () => {

  return (
    <div className="w-full pt-8 flex flex-col justify-center items-center">
      <SignUpOrLogin
        title={"Log In"}
        url={'http://localhost:5000/api/user/log-in'}
        userProps={userProps}
        userSchema={userSchema}
      ></SignUpOrLogin>
    </div>
  );
}

export default Login;
