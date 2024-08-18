import { ReactElement } from "react";

const withIconHOC = (Icon: ReactElement) => {
  const withIconHOC = (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70"
      {...props}
    >
      {Icon}
    </svg>
  )
  return withIconHOC;
}

export default withIconHOC