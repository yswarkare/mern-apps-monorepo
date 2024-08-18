import { lazy } from 'react';

const DefaultLayout = lazy(() => import('../layout/DefaultLayout'));
const LogIn = lazy(() => import('../pages/Login'));
const SignUp = lazy(() => import('../pages/SignUp'));

const Home = lazy(() => import('../pages/home'));
const About = lazy(() => import('../pages/About'));
const Todos = lazy(() => import('../pages/Todos'));
const UserDashboard = lazy(() => import('../pages/UserDashboard'));




export const routes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/todos',
        element: <Todos />
      },
      {
        path: '/user-dashboard',
        element: <UserDashboard />
      },
    ]
  },
  {
    path: '/login',
    element: <LogIn />
  },
  {
    path: '/sign-up',
    element: <SignUp />
  },
]