import React, { useState, useContext } from "react";
import axios from "axios";

import AppContext from "./AppContext";
import "../css/Form.css";

export default function Form() {
  const [userInput, setUserInput] = useState("");
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const option = {
        method: "post",
        url: "/api/v1/posts/",
        data: {
          content: userInput,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios(option);
      const { post } = response.data.data;
      const author = { _id: post.author, name: user.userName };
      dispatch({
        type: "CREATE_ONE_POST",
        payload: {
          ...post,
          author,
          content: post.content,
          isEditable: true,
        },
      });
      setUserInput("");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <section className="form-section">
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <textarea
          type="text"
          name="content"
          id="content"
          className="content"
          placeholder="What's happening?"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        ></textarea>
        <button className="btn" type="submit">
          Tweet
        </button>
      </form>
    </section>
  );
}
