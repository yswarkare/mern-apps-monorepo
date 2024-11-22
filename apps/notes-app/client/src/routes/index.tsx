import { lazy } from "react";
import path from "./path";

const AuthRouter = lazy(() => import("../components/AuthRouter"));
const DefaultLayout = lazy(() => import("../layouts/DefaultLayout"));
const Home = lazy(() => import("../pages/Home"));
const Notebooks = lazy(() => import("../pages/Notebooks"));
const About = lazy(() => import("../pages/About"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));

const routes = [{
  path: path.base,
  element: <DefaultLayout />,
  children: [{
    path: path.home,
    element: <AuthRouter><Home /></AuthRouter>,
  }, {
    path: path.notebooks,
    element: <AuthRouter><Notebooks /></AuthRouter>,
  }, {
    path: path.about,
    element: <AuthRouter><About /></AuthRouter>,
  }]
},
{
  path: path.login,
  element: <Login />,
},
{
  path: path.signup,
  element: <Signup />,
},
{
  path: "/*",
  element: <>404 error!</>
}
]

export default routes;