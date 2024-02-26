import {useState} from "react";
import {FaUserCircle, FaUser, FaLock, FaEye, FaEyeSlash} from "react-icons/fa";
import "./styles/login.css";
import {Link} from "react-router-dom";
import {AuthService} from "@services";
import {useAuth} from "@hooks/useAuth.hook";

async function userLogin(payload, Entity) {
  const entityService = new Entity();
  const entityResponse = await entityService.post(payload);

  if (!entityResponse) {
    return null;
  }

  return entityResponse;
}

const Login = () => {
  const [credentials, setCredentials] = useState({username: "", password: ""});
  const authProvider = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const entityResponse = await userLogin(credentials, AuthService);

    if (!entityResponse.success) {
      alert(entityResponse.message);
      return;
    }

    authProvider.login(entityResponse.result);

    // Implementar lógica de inicio de sesión aquí
  };

  const handleChange = (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value});
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="login-container">
      <div className="container-form">
        <div className="login-header">
          <a href="/">
            <FaUserCircle size={100} color="black" />
          </a>
        </div>
        <div className="container-form_title">
          <h4>Sign In</h4>
        </div>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          autoComplete="off"
        >
          <div className="form-container_username">
            <label htmlFor="username" className="form-label_username">
              Username
            </label>
            <div className="container_username">
              <div className="icon-user">
                <FaUser size={20} />
              </div>
              <input
                className="form-input_username"
                type="text"
                id="username"
                name="username"
                required
                placeholder="Ingresa tu username"
                value={credentials.username || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-container_password">
            <label htmlFor="password" className="form-label_password">
              Password
            </label>
            <div className="container_password">
              <div className="icon-user">
                <FaLock size={20} />
              </div>
              <input
                className="form-input_password"
                type={showPassword ? "text" : "password"}
                required
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={credentials.password || ""}
                onChange={handleChange}
              />
              <div className="icon-eyes">
                {!showPassword ? (
                  <FaEyeSlash size={30} onClick={togglePassword} />
                ) : (
                  <FaEye size={30} onClick={togglePassword} />
                )}
              </div>
            </div>
          </div>

          <div className="form-container_footer">
            <div className="form-check_remember-me">
              <input
                type="checkbox"
                className="form-check-input_remember-me"
                id="checkbox-signin"
                defaultChecked={true}
              />
              <label
                className="form-check-label_remmember-me"
                htmlFor="checkbox-signin"
              >
                Recordarme
              </label>
            </div>
            <div className="register-container">
              <p>
                <Link to="/auth/register" className="register-link">
                  <i className="register-icon"></i>Do not have an account?
                </Link>
              </p>
            </div>
          </div>

          <div className="form-container_button">
            <button type="submit">Ingresar</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
