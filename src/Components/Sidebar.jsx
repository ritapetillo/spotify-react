import React from "react";
import "../Styles/Sidebar.css";
import SidebarOption from "./SidebarOption";
import withUser from "./withUser";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { Link } from "react-router-dom";

function Sidebar({ playlist }) {
  console.log(playlist);

  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        style={{ width: "70%" }}
        src="https://images.squarespace-cdn.com/content/v1/580903cee58c62d4801b47cb/1506122333066-1GEPJH70NYKH95J3HAHM/ke17ZwdGBToddI8pDm48kE2wta9Sfx_AJtZar5TKFJYUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dj83OBbknoHUsMMB-dhx9lAj1Mjq1jazYDBs5YVRZsrBCjLISwBs8eEdxAxTptZAUg/Spotify_Logo_RGB_White.png"
        alt="spotify_logo"
      />
      <Link to="/">
        <SidebarOption title="Home" Icon={<HomeIcon />} />
      </Link>
      <Link to="/search">
        <SidebarOption title="Search" Icon={<SearchIcon />} />
      </Link>
      <SidebarOption title="Your Library" Icon={<LibraryMusicIcon />} />
      <br />
      <strong className="sidebar__title">playlist</strong>
      <hr />
      <div className="sidebar__playlist-container mt-3">
        {playlist &&
          playlist.map((singlePlaylist) => (
            <SidebarOption title={singlePlaylist.name} whatType="playlist" />
          ))}
      </div>
    </div>
  );
}

export default withUser(Sidebar);
