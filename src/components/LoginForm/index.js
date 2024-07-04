import { useState } from "react";
import "./index.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitForm = () => {};

  return (
    <div className="login-form-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className="login-website-logo-mobile-img"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-img"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-desktop-img"
          alt="website logo"
        />
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="username-input-field"
            value={username}
            onChange={onChangeUsername}
            placeholder="Username"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="password-input-field"
            value={password}
            onChange={onChangePassword}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
