import {createContext, useContext, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "./useLocalStorage.hook";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    navigate("/dashboard", {replace: true});
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/auth/login");
  };

  const getToken = () => {
    const value = window.localStorage.getItem("user");
    return JSON.parse(value);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      getToken,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
