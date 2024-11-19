import { FunctionComponent, MouseEventHandler } from 'react';
import { DarkCircle, LightCircle } from "../icons/CircleIcons";

type Props = {
  type?: "button" | "submit" | "reset" | undefined,
  loading?: boolean,
  children?: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean,
}

const withButtonsHoc = (classes?: string, Icon?: FunctionComponent, iconProps?: object) => {
  const withButtonsHoc = ({ type = "button", loading = false, children = '', onClick, disabled, ...props }: Props) => {
    return (
      <button type={type} className={`flex justify-center ${classes} ${Icon && 'relative'}`} onClick={onClick} disabled={loading || disabled} {...props}>
        {Icon && loading && <span className="absolute"><Icon {...iconProps} /></span>}
        <span className={`${loading && 'opacity-50'}`}>{children}</span>
      </button>
    );
  }
  return withButtonsHoc
}

export const Button = withButtonsHoc('', LightCircle, { size: '1.5rem' });

const primary = (icon?: FunctionComponent, props?: object) => withButtonsHoc('text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center', icon, props)

export const BtnPrimary = primary();
export const BtnPrimaryLoading = primary(LightCircle, { size: '1.5rem' });

const darkOutlined = (icon?: FunctionComponent, props?: object) => withButtonsHoc('py-2.5 px-5 font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center', icon, props)

export const BtnDarkOutlined = darkOutlined()
export const BtnDarkOutlinedLoading = darkOutlined(DarkCircle, { size: '1.5rem' })

