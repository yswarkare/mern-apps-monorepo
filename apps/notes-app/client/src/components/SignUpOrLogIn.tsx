import { InputUi } from "yw-daisyui";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BlocksShuffle, DotsMove } from "yw-icons";
import useApiCall from "../hooks/useApiCall";
import { AnyObject, ObjectSchema } from "yup";
import AuthService from "../services/auth.service";

type Props = {
  title: string
  userProps: object
  userSchema: ObjectSchema<FieldValues, AnyObject, any, "">
  url: string
}

const SignUpOrLogin = ({ title, userProps, userSchema, url }: Props) => {
  const { control, handleSubmit, formState: { isValid, errors, touchedFields: touched, }, reset } = useForm({
    resolver: yupResolver(userSchema),
  });
  const { error, loading, value, callApiFunction } = useApiCall()

  const submitHandler = async (data) => {
    try {
      console.log(data)
      if (isValid) {
        console.log({ isValid, data })
        if (url) {
          if (data?.confirmPassword) delete data.confirmPassword
          if (title === 'Sign Up') {
            await callApiFunction(AuthService.signUp(), data)
          }
          if (title === 'Log In') {
            await callApiFunction(AuthService.logIn(), data)
          }
          console.log(value)
          // reset()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full pt-8 flex flex-col justify-center items-center">
      <h1 className="p-8 text-xl">{title}</h1>
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
          <button className="btn btn-primary" title="sign-up" type="submit" disabled={loading}>
            {title}
          </button>
          {
            loading &&
            <div className="absolute">
              <DotsMove />
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

export default SignUpOrLogin;
