import { FunctionComponent, useState } from 'react';
import { Prop, validateEmail, validateObject, validatePassword } from 'ysw-validations';
import InputsUi from '../flowbite-ui/InputsUi';
import { UserCircle } from '../flowbite-icons/user';
import { EmailIcon } from '../flowbite-icons/email';
import { BtnPrimaryLoading } from '../flowbite-ui/Buttons';
import Errors from '../errors/Errors';
import { Link } from 'react-router-dom';

const userValidations = (page: string) => {
  const userVal: { username?: Prop, email: Prop, password: Prop } = {
    username: new Prop({ name: 'username', required: true, max: 150, min: 3, trim: true }),
    email: new Prop({ name: 'email', required: true, max: 150, min: 3, trim: true, valFunc: validateEmail }),
    password: new Prop({ name: 'password', required: true, max: 30, min: 6, trim: true, valFunc: validatePassword }),
  }
  if (page === 'login') {
    delete userVal.username;
  }
  return userVal
};

const initUser = (page: string) => {
  const initUser: { username?: FunctionComponent, email: FunctionComponent, password: string } = { username: UserCircle, email: EmailIcon, password: '' }
  if (page === 'login') {
    delete initUser.username;
  }
  return initUser
}

const userInputs = (page: string) => {
  const userInputs = [
    { label: 'Username', name: 'username', type: 'text', icon: UserCircle },
    { label: 'Email', name: 'email', type: 'email', icon: EmailIcon },
    { label: 'Password', name: 'password', type: 'password', icon: undefined },
  ]
  if (page === 'login') {
    userInputs.shift()
  }
  return userInputs;
}

const UserLogInSignUp = ({ page = 'sign-up', title = '', link = '' }) => {
  const [user, setUser] = useState(initUser(page));
  const [validations, setValidations] = useState(userValidations(page));
  const [submitClicked, setSubmitClicked] = useState(false);
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const onInputHandler = (key: string, value: string) => {
    const newUser = { ...user, [key]: value };
    setUser((prev) => ({ ...prev, [key]: value }));
    if (submitClicked) {
      const [newValidations] = validateObject(newUser, validations);
      setValidations(newValidations);
    }
  };

  const submitUser = async () => {
    try {
      setLoading(true);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = () => {
    if (!submitClicked) {
      setSubmitClicked(true);
    }
    const [newValidations, isValid] = validateObject(user, validations);
    setValidations(newValidations);
    console.log({ isValid, newValidations });
    if (isValid) {
      submitUser()
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full py-6 flex flex-row justify-center items center">
        <h2 className="font-bold text-3xl">{title}</h2>
      </div>
      <form className='w-full flex flex-col gap-4'>
        {userInputs(page).map(({ label, name, type, icon }) => (
          <InputsUi
            type={type}
            key={name}
            id={name}
            label={label}
            placeholder={label}
            icon={icon || undefined}
            value={user[name]}
            onChange={(e) => {
              onInputHandler(name, e.target.value);
            }}
            error={{ error: validations[name].error, message: validations[name].message }}
          />
        ))}
        <BtnPrimaryLoading
          type='button'
          onClick={() => {
            onSubmit();
          }}
          loading={loading}
        >
          {title}
        </BtnPrimaryLoading>
      </form>
      <div className="w-full py-4 flex flex-row justify-end">
        <Link to={`/${link}`} >go to {link} page</Link>
      </div>
      <Errors errors={errors} />
    </div>
  );
};

export default UserLogInSignUp;
