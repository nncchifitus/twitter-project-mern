import React, { useEffect, useCallback, useContext } from "react";
import axios from "axios";

import AppContext from "./AppContext";
import PostItem from "./PostItem";

import "../css/Post.css";

export default function PostList() {
  const { state, dispatch } = useContext(AppContext);
  const { posts, user } = state;
  const getAllPosts = useCallback(async () => {
    try {
      const option = { method: "get", url: "/api/v1/posts" };
      const response = await axios(option);
      const posts = response.data.data.posts;
      dispatch({
        type: "GET_ALL_POSTS",
        payload: posts,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const newPosts = posts.map((post) => {
    if (user) {
      return post.author.name === user.userName
        ? { ...post, isEditable: true }
        : { ...post, isEditable: false };
    } else {
      return { ...post, isEditable: false };
    }
  });
  return (
    <section className="post-section">
      <div className="post-list">
        {newPosts.map((post) => (
          <PostItem post={post} key={post._id} />
        ))}
      </div>
    </section>
  );
}
