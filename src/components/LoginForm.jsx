import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js";

import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (credentials.username && credentials.password) {
      postLogin(credentials.username, credentials.password)
        .then((response) => {
          window.localStorage.setItem("token", response.token);
          setAuth({
            token: response.token,
          });
          navigate("/");
        })
        .catch((error) => {
          setIsLoading(false);
          window.alert(error.message);
        });
    }
  };

  return (
    <section className="login-form">
      <h1>LOGIN</h1>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Loading" : "Login"}
        </button>
      </form>
      <p>
        New to Level Launch? <Link to="/signup">Sign Up</Link>
      </p>
    </section>
  );
}

export default LoginForm;
