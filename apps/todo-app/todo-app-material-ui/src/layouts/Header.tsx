import { Link } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
import paths from "../router/paths";

const headerItems = [
  { label: "Home", icon: '', path: paths.home },
  { label: "Profile", icon: '', path: paths.profile },
  { label: "Dashboard", icon: '', path: paths.dashboard },
  { label: "Log in", icon: '', path: paths.logIn },
  { label: "Sign Up", icon: '', path: paths.signUp },
]

const Header = () => {
  return (
    <FlexBetween>
      {headerItems.map(({ label, path }) => (
        <Link to={path}>{label}</Link>
      ))}
    </FlexBetween>
  );
}

export default Header;
