import { ReactElement } from "react";

const withIconHoc = (Icon: ReactElement) => ({ className = '', size = '' }: { className?: string, size?: string }) => {
  return (
    <svg className={`w-6 h-6 text-gray-500 dark:text-gray-400 ${className}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={size || "24"} height={size || "24"} fill="currentColor" viewBox="0 0 24 24">
      {Icon}
    </svg>
  );
}

export default withIconHoc;