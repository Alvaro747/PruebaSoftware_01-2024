import {FaSignOutAlt} from "react-icons/fa";
import "./styles/navbar.css";
import {useAuth} from "@hooks/useAuth.hook";


const Navbar = () => {
  const authProvider = useAuth();

  const logout = (e) => {
    e.preventDefault();
    authProvider.login();
  };
  
  return (
    <header>
      <nav className="navbar">
        <a href="#">Prueba de software</a>
        <ul>
          <li>
            <button className="logout-button" onClick={(e) => logout(e)}>
              <span className="text-logout">Logout</span>
              <FaSignOutAlt />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
