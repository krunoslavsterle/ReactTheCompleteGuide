import React, { Component } from "react";
import axios from "../../../axios";

import Post from "../../../components/Post/Post";
import classes from "./Posts.css";

class Posts extends Component {
  state = {
    posts: []
  };

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Ksterle"
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(error => {
        console.log(error);
        //this.setState({ error: true });
      });
  }

  render() {
    let posts = <p>Somthing went wrong</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Post
            title={post.title}
            author={post.author}
            key={post.id}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }

    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
