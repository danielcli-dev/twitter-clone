import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Feed.css";
import { db } from "./firebase";
import Tweetbox from "./Tweetbox";
import Post from "./Post";
import FlipMove from "react-flip-move";
import { useStateValue } from "./StateProvider";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <Tweetbox />

      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            displayName={post.data.displayName}
            username={post.data.username}
            verified={post.data.verified}
            text={post.data.text}
            image={post.data.image}
            avatar={post.data.avatar}
            timestamp={post.data.timestamp}
            uid={post.data.uid}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
