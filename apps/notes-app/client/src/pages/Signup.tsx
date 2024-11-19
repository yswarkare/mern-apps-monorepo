import { InputUi } from "yw-daisyui";
import { string } from 'yup'
import { useSessionReducer } from 'yw-hooks'

const userProps = {
  firstName: "First Name",
  lastName: "Last Name",
  username: "Username",
  mobile: "Mobile Number",
  email: "Email ID",
  password: "Password",
  confirmPassword: "Confirm Password",
}

const userSchema = {
  firstName: string().required().min(3).max(150),
  lastName: string().required().min(3).max(150),
  username: string().required().min(3).max(150),
  mobile: string().required().min(10).max(15),
  email: string().email().required().min(3).max(150),
  password: string().required().min(8).max(150),
  confirmPassword: string().required().min(8).max(150),
}

const userReducer = (state: any, { type, payload }: { type: string, payload: any }) => {

  for (const key in state) {
    if (key === type) {
      state = { ...state, [key]: payload }
      return state;
    }
  }
}

const Signup = () => {

  const [user, dispatch] = useSessionReducer(userReducer, userProps)

  return (
    <div className="w-full pt-8 flex flex-col justify-center items-center">
      <h1 className="p-8 text-xl">Sign Up</h1>
      <form className="w-[60%] gap-3 flex flex-col">
        {
          Object.entries(userProps).map(([key, value]) => (
            <InputUi type={key} id={key} label={value} position="left" key={key} />
          ))
        }
        <div className="">
          <button className="btn btn-primary" title="sign-up" type="button" onClick={() => { }}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
