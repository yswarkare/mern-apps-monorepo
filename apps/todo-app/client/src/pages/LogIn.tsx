import { useState } from "react";
import InputsUi from "../components/flowbite-ui/InputsUi";
import { UserCircle } from "../components/flowbite-icons/user";
import { EmailIcon } from "../components/flowbite-icons/email";
import { Prop, validateEmail, validateObject, validatePassword } from 'ysw-validations'

const userValidations = {
  username: new Prop({ name: 'username', required: true, max: 150, min: 3, trim: true }),
  email: new Prop({ name: 'email', required: true, max: 150, min: 3, trim: true, valFunc: validateEmail }),
  password: new Prop({ name: 'password', required: true, max: 30, min: 6, trim: true, valFunc: validatePassword }),
}

const Login = () => {
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const [validations, setValidations] = useState(userValidations);
  const [submitClicked, setSubmitClicked] = useState(false)
  

  const onInputHandler = (key: string, value: string) => {
    const newUser = { ...user, [key]: value }
    setUser((prev) => ({ ...prev, [key]: value }))
    if (submitClicked) {
      const [newValidations, isValid] = validateObject(newUser, validations);
      setValidations(newValidations);
    }
  }

  const onSubmit = () => {
    if (!submitClicked) {
      setSubmitClicked(true);
    }
    const [newValidations, isValid] = validateObject(user, validations);
    setValidations(newValidations);
    console.log(newValidations)
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <form className="w-[85%] sm:w-[60%] md:w-[50%] lg:w-[35%] flex flex-col gap-4">
        <InputsUi id="Username" label="Username" placeholder="Username" icon={UserCircle} value={user.username} onChange={(e) => { onInputHandler('username', e.target.value) }} error={{ error: validations.username.error, message: validations.username.message }} />
        <InputsUi type="email" id="Email" label="Email" placeholder="Email" icon={EmailIcon} value={user.email} onChange={(e) => { onInputHandler('email', e.target.value) }} error={{ error: validations.email.error, message: validations.email.message }} />
        <InputsUi type='password' id="Password" label="Password" placeholder="Password" value={user.password} onChange={(e) => { onInputHandler('password', e.target.value) }} error={{ error: validations.password.error, message: validations.password.message }} />
        <button type="button" onClick={() => { onSubmit() }} >LogIn</button>
      </form>
    </div>
  );
}

export default Login;
