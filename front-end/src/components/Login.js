import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import AppContext from "./AppContext";
import "../css/Auth.css";

export default function Login() {
  const { dispatch } = useContext(AppContext);
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const handleChangeInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const option = {
        method: "post",
        url: "/api/v1/auth/login",
        data: userInput,
      };
      const response = await axios(option);
      const { token, userName } = response.data.data;
      localStorage.setItem("token", token);
      dispatch({ type: "SET_CURRENT_USER", payload: { userName } });
      history.push("/");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <section className="auth-container">
        <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
          <h2>Enter Your Account</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <input
            type="email"
            name="email"
            value={userInput.email}
            required
            placeholder="Email"
            onChange={(e) => {
              handleChangeInput(e);
            }}
          />
          <input
            type="password"
            name="password"
            value={userInput.password}
            required
            placeholder="Password"
            onChange={(e) => {
              handleChangeInput(e);
            }}
          />
          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </section>
    </div>
  );
}
