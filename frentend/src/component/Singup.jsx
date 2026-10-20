import React, { useState } from "react";
import { user_signup_axios } from "../axios/user.axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/User.login.context";
import { Link } from "react-router-dom";


const Signup = () => {
  const [userform, setuserform] = useState({
    name: "",
    email: "",
    password: "",
  });

const { setAccessToken, checkUser , setUser } = useAuth();
   const navigate = useNavigate();
  function text_handle(e) {
    const { name, value } = e.target;
    
    setuserform((pre) => ({
      ...pre,
      [name]: value,
    }));
  }


async function handleSubmit(e) {
  e.preventDefault();

  try {
    const response = await user_signup_axios(userform);

    console.log("Signup response:", response.data);

    if (response.data.success === true) {
      setAccessToken(response.data.accessToken);

      setUser(response.data.user_create.name)

      await checkUser();

      navigate("/", { replace: true });
    }

  } catch (error) {
    console.log(
      error.response?.data || error.message
    );
  }
}
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>

        <p className="signup-subtitle">
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={userform.name}
              onChange={text_handle}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={userform.email}
              onChange={text_handle}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={userform.password}
              onChange={text_handle}
              required
            />
          </div>

          <button
            type="submit"
            className="signup-button"
          >
            Sign Up
          </button>
        </form>

        <div>
        <Link to="/login" >do you have account   </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;