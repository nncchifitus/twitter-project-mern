import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AppContext from "./AppContext";

import "../css/Header.css";

export default function Header() {
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;
  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "SET_CURRENT_USER",
      payload: null,
    });
  };

  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/">twitter</Link>
      </h1>
      <nav>
        <ul className="main-nav">
          {user ? (
            <>
              <li>
                <span className="user-name">Hello, {user.userName}</span>
              </li>
              <li>
                <Link to="#" onClick={handleSignOut}>
                  Sign out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
