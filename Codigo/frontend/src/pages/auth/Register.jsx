import {useState} from "react";
import "./styles/register.css";
import {Link} from "react-router-dom";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, lastName, email, password} = credentials;
    console.log("Name:", name);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);
    // Implement registration logic here
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
      <div className="input-line">
        <label className="label-form" htmlFor="repeatPassword">
          Repeat Password
        </label>
        <input
          type="password"
          className="input-field"
          placeholder="Repeat your password"
        />
      </div>
      <button className="button-form">Register</button>
      <Link to="/auth/login" className="second-button">
        Do you have an account?
      </Link>
    </form>
  );
};

export default Register;
