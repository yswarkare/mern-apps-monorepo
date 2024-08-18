import { useEffect, useState } from "react";
import { Link, useMatches } from "react-router-dom";
import { UserIcon } from "../flowbite-icons/user";
import ThemeSwitch from "./theme-switch";


const userItemClass = `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`

const activeNavItemClass = `block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500`

const inactiveNavItemClass = `block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`

const navItems = [{ path: '/', name: 'Home' }, { path: '/todos', name: 'Todos' }, { path: '/user-dashboard', name: 'User Dashboard' }, { path: '/about', name: 'About' },];

export default function Navbar() {
  const matches = useMatches();
  const location = matches[1];
  const [selected, setSelected] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log({ location, matches });
    if (location?.pathname) {
      setSelected(location.pathname);
    }
  }, [location.pathname]);


  return (<div className="w-full flex flex-col justify-start">
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex gap-2 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {
            isLoggedIn ? (
              <>
                <button type="button" className="flex text-sm bg-gray-300 dark:bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                  <span className="sr-only">Open user menu</span>
                  <UserIcon className="w-8 h-8 rounded-full" />
                </button>
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a href="#" className={userItemClass}>Dashboard</a>
                    </li>
                    <li>
                      <a href="#" className={userItemClass}>Settings</a>
                    </li>
                    <li>
                      <a href="#" className={userItemClass}>Earnings</a>
                    </li>
                    <li>
                      <a href="#" className={userItemClass}>Sign out</a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link to={'/login'} className={'/login' === selected ? activeNavItemClass : inactiveNavItemClass} aria-current="page">Login</Link>
                <Link to={'/sign-up'} className={'/login' === selected ? activeNavItemClass : inactiveNavItemClass} aria-current="page">Sign-Up</Link>
              </>
            )
          }
          <ThemeSwitch />
          <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {
              navItems.map(({ path, name }) => (
                <li key={path}>
                  <Link to={path} className={path === selected ? activeNavItemClass : inactiveNavItemClass} aria-current="page">{name}</Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </nav>
  </div>)
}