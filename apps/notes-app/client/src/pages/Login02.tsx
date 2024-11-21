import { InputUi } from "yw-daisyui";
import { object, string } from 'yup'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DotsMove, BlocksShuffle } from "yw-icons";
import useApiCall from "../hooks/useApiCall";
import { useEffect } from "react";

type User = {
  username: string;
  password: string
}

const userProps = {
  username: "Email ID or Username or Mobile Number",
  password: "Password",
}

const userSchema = object({
  email: string().required(),
  password: string().required(),
})

const Login = () => {
  const { control, handleSubmit, formState: { isValid, errors, touchedFields: touched, }, reset } = useForm<User>({
    resolver: yupResolver(userSchema),
  });
  const { error, loading, value, callApi } = useApiCall({})

  useEffect(() => {
    console.log(typeof userProps);
  }, []);

  const submitHandler = async (data) => {
    try {
      console.log(data)
      if (isValid) {
        console.log({ isValid, data })
        await callApi("", { method: "POST", body: JSON.stringify(data) })
        console.log(value)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full pt-8 flex flex-col justify-center items-center">
      <h1 className="p-8 text-xl">Log In</h1>
      <form className="w-[60%] gap-3 flex flex-col items-center justify-center" onSubmit={handleSubmit(submitHandler)}>
        {
          Object.entries(userProps).map(([key, value]) => (
            <Controller
              name={key}
              control={control}
              render={({ field }) => (
                <InputUi
                  type={key}
                  id={key}
                  label={value}
                  position="left"
                  key={key}
                  disabled={loading}
                  error={(touched?.[key] && errors?.[key]?.message)}
                  {...field}
                />
              )}
            />
          ))
        }
        <div className="relative flex justify-center">
          <button className="btn btn-primary" title="sign-up" type="submit" disabled={loading}>Log In</button>
          {
            loading &&
            <div className="absolute">
              <DotsMove size="3rem" />
            </div>
          }
        </div>
        {
          loading &&
          <div className="absolute">
            <BlocksShuffle size="3rem" />
          </div>
        }
        {
          error && (
            <div className="w-full flex flex-col justify-start items-center">
              {JSON.stringify(error)}
            </div>
          )
        }
      </form>
    </div>
  );
}

export default Login;
