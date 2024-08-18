import withIconHOC from "./withIconHOC"

const sIcon = <path
  fillRule="evenodd"
  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
  clipRule="evenodd" />


const SearchIcon = withIconHOC(sIcon)

export default SearchIcon