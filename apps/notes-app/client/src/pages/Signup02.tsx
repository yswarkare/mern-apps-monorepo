import { InputUi } from "yw-daisyui";
import { object, ref, string } from 'yup'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const userProps = {
  firstName: "First Name",
  lastName: "Last Name",
  username: "Username",
  mobile: "Mobile Number",
  email: "Email ID",
  password: "Password",
  confirmPassword: "Confirm Password",
}

const userSchema = object({
  firstName: string().required().min(3).max(150),
  lastName: string().required().min(3).max(150),
  username: string().required().min(3).max(150),
  mobile: string().required().min(10).max(15),
  email: string().email().required().min(3).max(150),
  password: string()
    .min(8, "You must enter at least 8 characters.")
    .max(150)
    .matches(/[0-9]/, "You must enter at least one number.")
    .matches(/[a-z]/, "You must enter at least one lowercase letter.")
    .matches(/[A-Z]/, "You must enter at least one uppercase letter.")
    .matches(/[#?!@$%^&*-]/, "You must enter at least one symbols.")
    .required(),
  confirmPassword: string()
    .oneOf([ref('password')], "Passwords must match.")
    .required(),
})

const Signup = () => {
  const { control, register, handleSubmit, formState: { isValid, errors, touchedFields: touched, }, reset } = useForm({
    resolver: yupResolver(userSchema),
  });

  const submitHandler = (data) => {
    console.log(data)
    if (isValid) {
      console.log({ isValid, data })
    }
  }

  return (
    <div className="w-full pt-8 flex flex-col justify-center items-center">
      <h1 className="p-8 text-xl">Sign Up</h1>
      <form className="w-[60%] gap-3 flex flex-col" onSubmit={handleSubmit(submitHandler)}>
        {
          Object.entries(userProps).map(([key, value]) => (
            <Controller
              name={key}
              control={control}
              render={({ field }) => <InputUi type={key} id={key} label={value} position="left" key={key} error={(touched?.[key] && errors?.[key]?.message)} {...field} />}
            />

          ))
        }
        <div className="">
          <button className="btn btn-primary" title="sign-up" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
