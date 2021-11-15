import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import AppContext from "./AppContext";

import "../css/Auth.css";

export default function Register() {
  const history = useHistory();
  const { dispatch } = useContext(AppContext);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const handleChangeInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const option = {
        method: "post",
        url: "/api/v1/auth/register",
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

  console.log(errorMessage);
  return (
    <section className="auth-container">
      <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
        <h2>Register New Account</h2>
        {errorMessage &&
          (Array.isArray(errorMessage) ? (
            errorMessage.map((error) => (
              <div className="error-message">{error}</div>
            ))
          ) : (
            <div className="error-message">{errorMessage}</div>
          ))}
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => handleChangeInput(e)}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          onChange={(e) => handleChangeInput(e)}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          onChange={(e) => handleChangeInput(e)}
        />
        <button className="btn" type="submit">
          Register
        </button>
      </form>
    </section>
  );
}
