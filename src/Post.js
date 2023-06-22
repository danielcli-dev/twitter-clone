import { Avatar, IconButton } from "@material-ui/core";
import React, { forwardRef, useState } from "react";
import "./Post.css";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import { db } from "./firebase";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { useStateValue } from "./StateProvider";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

const Post = forwardRef(
  (
    {
      key,
      id,
      displayName,
      username,
      verified,
      text,
      image,
      avatar,
      timestamp,
      uid
    },
    ref
  ) => {
    const [editOn, setEditOn] = useState(false);
    const [editInput, setEditInput] = useState(text);
    const [editImage, setEditImage] = useState(image);
    const [{ user }, dispatch] = useStateValue();

    const delPost = () => {
      if (user.uid === uid) {
        if (window.confirm("Are you sure you want to delete this post?")) {
          db.collection("posts").doc(id).delete();
        } else {
        }
      }
    };

    const toggleEdit = () => {
      if (!editOn && user.displayName === displayName) {
        setEditOn(true);
      }
    };

    const cancelEdit = () => {
      setEditOn(false);
      setEditInput(text);
      setEditImage(image);
    };

    const editPost = (e) => {
      e.preventDefault();

      if (editInput !== "") {
        db.collection("posts").doc(id).update({ text: editInput });
        db.collection("posts").doc(id).update({ image: editImage });
        setEditOn(false);
      } else {
        alert("Text field cannot be empty");
      }
    };

    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />}{" "}
                  {username} {new Date(timestamp?.toDate()).toLocaleString()}
                </span>
              </h3>
            </div>

            <div
              className={`${!editOn && "post__headerDescription"} ${
                editOn && "hidden"
              }`}
            >
              <p>{text}</p>
            </div>
            <div className={`hidden ${editOn && "post__headerEdit"}`}>
              <form>
                <input
                  // onKeyDown={editPost}

                  defaultValue={text}
                  placeholder="Say Something..."
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />

                <input
                  className="input__image"
                  defaultValue={image}
                  placeholder="Enter Image URL..."
                  type="text"
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                />

                <div className="input__buttons">
                  <IconButton onClick={editPost} type="submit">
                    <DoneIcon />
                  </IconButton>
                  <IconButton>
                    <CloseIcon onClick={cancelEdit} />
                  </IconButton>
                </div>
                {/* <div className="input__buttons">
                    <IconButton onClick={editPost} type="submit">
                      <DoneIcon />
                    </IconButton>
                    <IconButton>
                      <CloseIcon onClick={cancelEdit} />
                    </IconButton>
                  </div> */}
              </form>
            </div>
          </div>

          <div
            className={`${!editOn && "post__headerDescription"} ${
              editOn && "hidden"
            }`}
          >
            <img src={image} alt="" />
          </div>
          <div className="post__footer">
            <IconButton onClick={delPost}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <EditIcon onClick={toggleEdit} fontSize="small" />
            </IconButton>
            <IconButton>
              <RepeatIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <PublishIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
