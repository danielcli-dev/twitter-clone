import React, { useState } from "react";
import "./Tweetbox.css";
import { Avatar, Button } from "@material-ui/core";
import firebase from "firebase";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";

function Tweetbox() {
  const [tweetMsg, setTweetMsg] = useState("");
  const [tweetImg, setTweetImg] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const sendPost = (e) => {
    if (tweetMsg) {
      e.preventDefault();

      db.collection("posts").add({
        displayName: user.displayName,
        username: user.email,
        verified: true,
        text: tweetMsg,
        image: tweetImg,
        avatar: user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        uid: user.uid
      });

      setTweetMsg("");
      setTweetImg("");
    } else {
      alert("Error: Requires text field");
      e.preventDefault();
    }
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src={user.photoURL} />
          <input
            type="text"
            placeholder="What's happening?"
            value={tweetMsg}
            onChange={(e) => setTweetMsg(e.target.value)}
          />
        </div>
        <input
          className="tweetBox__imageInput"
          type="text"
          placeholder="Optional: Enter image URL"
          value={tweetImg}
          onChange={(e) => setTweetImg(e.target.value)}
        />
        <Button
          className="tweetBox__tweetButton"
          type="submit"
          onClick={sendPost}
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default Tweetbox;
