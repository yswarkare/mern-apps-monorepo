import { lazy } from "react";
import path from "./path";

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
    element: <Home />,
  }, {
    path: path.notebooks,
    element: <Notebooks />,
  }, {
    path: path.about,
    element: <About />,
  }, {
    path: path.login,
    element: <Login />,
  }, {
    path: path.signup,
    element: <Signup />,
  },]
},
{
  path: "/*",
  element: <>404 error!</>
}
]

export default routes;