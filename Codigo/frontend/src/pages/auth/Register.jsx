import {useState} from "react";
import "./styles/register.css";
import {Link} from "react-router-dom";
import {AuthService} from "@services";

async function userRegister(payload, Entity) {
  const entityService = new Entity();
  const entityResponse = await entityService.create(payload);

  if (!entityResponse) {
    return null;
  }

  return entityResponse;
}

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const entityResponse = await userRegister(credentials, AuthService);

    if (!entityResponse.success) {
      alert(entityResponse.message);
      return;
    }

    alert(entityResponse.message);

    window.open("/auth/login", "_self");
  };

  const handleChange = (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value});
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="register-form">
      <h2>REGISTER</h2>
      <div className="input-line">
        <label className="label-form" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          className="input-field"
          name="name"
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>
      <div className="input-line">
        <label className="label-form" htmlFor="lastName">
          Last Name
        </label>
        <input
          type="text"
          className="input-field"
          name="lastName"
          placeholder="Enter your last name"
          onChange={handleChange}
        />
      </div>
      <div className="input-line">
        <label className="label-form" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          className="input-field"
          placeholder="Enter your contact email"
          name="email"
          onChange={handleChange}
        />
      </div>
      <div className="input-line">
        <label className="label-form" htmlFor="username">
          Username
        </label>
        <input
          type="username"
          name="username"
          className="input-field"
          placeholder="Enter your username"
          onChange={handleChange}
        />
      </div>
      <div className="input-line">
        <label className="label-form" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="input-field"
          placeholder="Enter your password"
          name="password"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="button-form">
        Register
      </button>
      <Link to="/auth/login" className="second-button">
        Do you have an account?
      </Link>
    </form>
  );
};

export default Register;
