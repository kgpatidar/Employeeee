import React from "react";
import "./Login.css";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/userAction";

const Login = (props) => {
  // FIELD VALUE
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  // CREDENTIAL VALUE CHANGE REFLECTOR
  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  // SUBMIT HANDLER
  const handleSubmit = () => {
    props.loginUser(loginData);
  };

  return (
    <div className="adduser-container">
      <header>
        <h1>Login</h1>
      </header>

      <div>
        {/* EMAIL */}
        <div>
          <label>Email</label>
          <br></br>
          <input
            id="email-input"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label>Password</label>
          <br></br>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* SUBMIT BUTTON */}
        <input
          type="submit"
          className="adduser-sumit-btn"
          value="Login"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default connect(null, { loginUser })(Login);
