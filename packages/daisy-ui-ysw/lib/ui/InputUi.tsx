import { ChangeEventHandler, useState } from "react";

const withIconHOC = (Icon: any) => {
  const withIconHOC = (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70"
      {...props}
    >
      <Icon />
    </svg>
  )
  return withIconHOC;
}

const sIcon = () => (<path
  fillRule="evenodd"
  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
  clipRule="evenodd" />)


const SearchIcon = withIconHOC(sIcon)

const eIcon = () => (<><path
  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
  <path
    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></>)

const EmailIcon = withIconHOC(eIcon)

const uIcon = () => (<path
  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />)

const UserIcon = withIconHOC(uIcon)

const kIcon = () => (<path
  fillRule="evenodd"
  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
  clipRule="evenodd" />)

const KeyIcon = withIconHOC(kIcon)

const InputIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'search': return <SearchIcon />
    case 'email': return <EmailIcon />
    case 'username': return <UserIcon />
    case 'password': return <KeyIcon />
    default: return null
  }
}

const InputUi = ({ type, position, id, onClick, onChange, ...props }: { type: string, position?: string, id?: string, onClick?: any, onChange?: ChangeEventHandler<HTMLInputElement> }) => {

  const [inType, setInType] = useState(type)

  const changeIcon = (e: any) => {
    if (onClick) onClick(e)
    if (type === 'password') {
      setInType(inType === 'password' ? 'text' : "password")
    }
  }

  return (
    <label className="input input-bordered flex items-center gap-2">
      {position === 'left' && <div onClick={(e) => changeIcon(e)}><InputIcon type={type} /></div>}
      <input type={inType === 'password' ? 'password' : "text"} title={id} id={id} className="grow" placeholder={type} onChange={onChange} {...props} />
      {position === 'right' && <div onClick={(e) => changeIcon(e)}><InputIcon type={type} /></div>}
    </label>
  );
}

export default InputUi;
