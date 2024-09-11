import { lazy } from 'react';
import paths from './paths';
const DefaultPage = lazy(() => import("../layouts/DefaultPage"));
const Home = lazy(() => import("../pages/Home"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const LogIn = lazy(() => import("../pages/LogIn"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Profile = lazy(() => import("../pages/Profile"));


const routes = [{
  path: paths.base,
  element: <DefaultPage></DefaultPage>,
  children: [{
    path: paths.home,
    element: <Home />
  },
  {
    path: paths.dashboard,
    element: <Dashboard />
  },
  {
    path: paths.profile,
    element: <Profile />
  }]
},
{
  path: paths.logIn,
  element: <LogIn />
},
{
  path: paths.signUp,
  element: <SignUp />
},]

export default routes;