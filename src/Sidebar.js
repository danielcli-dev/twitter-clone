import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import TwitterIcon from "@material-ui/icons/Twitter";
// import { Button } from "@material-ui/core";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { Link } from "react-router-dom";

function Sidebar() {
  const [{ user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <TwitterIcon className="sidebar__twitterIcon" />
        <h2>Signed in as {user.displayName}</h2>
        <button
          className="sidebar__headerLogout"
          onClick={handleAuthentication}
        >
          Log out
        </button>
      </div>

      <Link to="/" style={{ textDecoration: "none " }}>
        <SidebarOption active Icon={HomeIcon} text="Home" />
      </Link>

      <Link to="/what" style={{ textDecoration: "none " }}>
        <SidebarOption Icon={SearchIcon} text="Explore" />
      </Link>

      <SidebarOption Icon={NotificationsIcon} text="Notifications" />
      <SidebarOption Icon={MailOutlineIcon} text="Messages" />
      <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
      <SidebarOption Icon={ListAltIcon} text="Lists" />
      <SidebarOption Icon={PermIdentityIcon} text="Profile" />
      <SidebarOption Icon={MoreHorizIcon} text="More" />

      {/* <Button
        variant="outlined"
        className="sidebar__tweet"
        fullWidth
      >
        Tweet
      </Button> */}
    </div>
  );
}

export default Sidebar;
