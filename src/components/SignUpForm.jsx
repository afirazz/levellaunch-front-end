import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postUser from "../api/post-user";
import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js";

function SignUpForm() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  console.log(userDetails);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [id]: value,
    }));
  };

  console.log(userDetails);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (
      userDetails.username &&
      userDetails.first_name &&
      userDetails.last_name &&
      userDetails.email &&
      userDetails.password
    ) {
      postUser(
        userDetails.username,
        userDetails.first_name,
        userDetails.last_name,
        userDetails.email,
        userDetails.password
      )
        .then((response) => {
          console.log(response);
          postLogin(userDetails.username, userDetails.password).then(
            (loginResponse) => {
              window.localStorage.setItem("token", loginResponse.token);
              setAuth({
                token: loginResponse.token,
              });
            }
          );
          navigate("/");
        })
        .catch((error) => {
          setIsLoading(false);
          window.alert(error.message);
        });
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          placeholder="Enter first name"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          id="last_name"
          placeholder="Enter last name"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
}

export default SignUpForm;
