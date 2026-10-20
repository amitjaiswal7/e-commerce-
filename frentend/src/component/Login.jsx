import React, { useState } from 'react';
import { login_user } from '../axios/user.axios.post';
import { useAuth } from '../context/User.login.context';



function Login() {
  const [userfor, setuserfor] = useState({
    email: "",
    password: ""
  });

  const [errorMsg, setErrorMsg] = useState("");
  const { user, setUser, accessToken, setAccessToken } = useAuth();

  function text_hendle(e) {
    const { name, value } = e.target;
    setuserfor((pre) => ({
      ...pre,
      [name]: value
    }));
  }

async function user_send_hendle(e) {
  e?.preventDefault();

  try {
    setErrorMsg("");

    if (
      userfor.email === "" ||
      userfor.password === "" ||
      userfor.password.length < 8
    ) {
      setErrorMsg("Email and password (min 8 chars) are required.");
      return;
    }

    const response = await login_user(userfor);

    if (response.data.success) {

      // Access token React memory mein
      setAccessToken(response.data.accessToken);

      // User information
      setUser(response.data.user);

      // Optional: current user verify
      // await checkUser();

      // Login ke baad redirect
      window.location.href = "/";
    }

  } catch (error) {
    console.log(error);

    setErrorMsg(
      error.response?.data?.message ||
      "Login failed. Please try again."
    );
  }
}

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        {errorMsg && <p className="error-message">{errorMsg}</p>}

        <div className="login-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="enter your email"
            name="email"
            onChange={text_hendle}
            value={userfor.email}
            required
          />
        </div>

        <div className="login-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="enter your password"
            name="password"
            onChange={text_hendle}
            value={userfor.password}
            required
          />
        </div>

        <div className="login-button">
          <button onClick={user_send_hendle}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;