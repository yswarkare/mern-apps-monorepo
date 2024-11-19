import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { Eye, EyeSlash } from "../icons/password";

const IconsContainer = ({ iconClass = '', Icon, position = '', onClick }: { iconClass?: string, Icon: JSX.ElementType, position?: string, onClick?: MouseEventHandler<HTMLSpanElement> }) => {
  return (
    <span className={`absolute h-full inline-flex items-center px-2 text-sm text-gray-900 rounded-s-md dark:text-gray-400 ${iconClass} ${position === 'left' ? 'left-0' : position === 'right' ? 'right-0' : ""}`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : '' }} >
      <Icon />
    </span>
  )
}

type Props = {
  label?: string, id?: string,
  icon?: JSX.ElementType,
  placeholder?: string,
  labelClass?: string, containerClass?: string, inputClass?: string, iconClass?: string, position?: string, type?: string, value?: string, onChange?: ChangeEventHandler<HTMLInputElement> | undefined, error?: { error?: boolean, message?: string }
}

const InputsUi = ({ label = '', id = 'input-field', icon, placeholder = '', labelClass = '', containerClass = '', inputClass = '', iconClass = '', position = 'right', type = "text", value = '', onChange, error = { error: false, message: '' } }: Props) => {

  const [showPassword, setShowPassword] = useState(false);

  const onShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <fieldset className={`w-full flex flex-col gap-1 justify-center items-baseline ${containerClass}`}>
      {
        label &&
        <span className={`block text-sm font-medium text-gray-900 dark:text-white ${labelClass}`}>{label}</span>
      }
      <label htmlFor={id} className={`w-full flex ${(icon || type === 'password') && 'relative'}`} aria-controls={id}>
        {icon &&
          <IconsContainer iconClass={iconClass} Icon={icon} position={position} />
        }
        {type === 'password' &&
          <IconsContainer iconClass={iconClass} Icon={showPassword ? EyeSlash : Eye} position={position} onClick={() => { onShowPassword() }} />
        }
        <input type={showPassword ? 'text' : type} id={id} className={`w-full rounded-lg border text-gray-900 border-gray-300 dark:border-gray-600 block flex-1 min-w-0 w-full text-sm p-2.5 dark:placeholder-gray-400 dark:text-white ${error.error == true ?
            'bg-red-300 dark:bg-red-900 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500'
            : 'bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'} ${inputClass} ${
            position === 'left' ? 'pl-10' : position === 'right' ? 'pr-10' : ""} `} placeholder={placeholder} onChange={onChange} value={value} />
      </label>
      {
        error.error &&
        <span className="text-sm text-red-500 text-wrap">{error.message}</span>
      }
    </fieldset>

  );
}

export default InputsUi;
