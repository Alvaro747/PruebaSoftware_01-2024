import { FaSignOutAlt } from "react-icons/fa";
import "./styles/navbar.css"

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <a href="#">Nombre de la aplicación</a>
        <ul>
          <li>
            <a href="#">
              <span className="text-logout">Logout</span>
              <FaSignOutAlt />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;