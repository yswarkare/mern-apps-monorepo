import { Link } from 'react-router-dom';
import { SelectTheme, ThemeDropdown } from 'yw-daisyui'
import path from '../routes/path';

const themes = ["emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset",]

const headerItems = [
  { label: 'Home', path: path.home },
  { label: 'Notebooks', path: path.notebooks },
  { label: 'About', path: path.about },
  { label: 'Sign Up', path: path.signup },
  { label: 'Log In', path: path.login },
]

function Header() {
  return (
    <div id='app-header' className="w-full flex flex-row justify-around items-center">
      <ThemeDropdown themes={themes} />
      {
        headerItems.map(({ label, path }) => (
          <Link to={path} className={`w-full hover:bg-secondary`}>{label}</Link>
        ))
      }
      <SelectTheme themes={['dark', 'light', 'altDark', 'cupcake', 'darkAlt', "bumblebee", ...themes]} />
    </div>
  )
}

export default Header;