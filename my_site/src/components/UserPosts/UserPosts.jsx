import React from "react";
import { useState, useEffect } from "react";
import PostCard from "../PostCard/PostCard";

const UserPosts = ({ userId }) => {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .catch((error) => console.log(error));
    }, [userId]);
  
    return (
      <div className="USERPOSTS">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    );
  };

  export default UserPosts;