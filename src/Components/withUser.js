import React, { useState, useEffect } from "react";
import { useStateProviderValue } from "../StateProvider";

import { loginUrl, fetchToken } from "../utils/spotify";
import queryString from "query-string";
import SpotifyWebApi from "spotify-web-api-js";
import ls from "local-storage";
const spotifyApi = new SpotifyWebApi();

const withUser = (WrappedComponent) => (props) => {
  const [{ token }, dispatch] = useStateProviderValue();
  const [playlist, setPlaylist] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [researchResults, setResearchResults] = useState([]);

  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState("");

  const [album, setAlbum] = useState("");

  //set the token to make api requests
  spotifyApi.setAccessToken(ls.get("token"));

  //after getting the token, I want to get the user
  const getUser = async () => {
    if (ls.get("token")) {
      spotifyApi.setAccessToken(ls.get("token"));
      let currentUser = await spotifyApi.getMe();
      if (currentUser) {
        setUser(currentUser);
      }
    }
  };

  //get all current user playlist
  const getPlaylists = () => {
    return spotifyApi.getUserPlaylists(user?.id).then(
      function (data) {
        setPlaylist(data.items);
        console.log("User playlists", data.items);
      },
      function (err) {
        console.error(err);
      }
    );
  };

  const getResearch = (q, t) => {
    spotifyApi.searchAlbums(q).then(
      function (data) {
        setResearchResults(data);
        setLoaded(!loaded);
        console.log(data);
      },
      function (err) {
        console.error(err);
      }
    );
  };

  //get all categories
  const fetchCategories = async () => {
    const res = await fetch(`https://api.spotify.com/v1/browse/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${ls.get("token")}`,
      },
    });
    const data = await res.json();
  };

  //get all new releases
  const fetchNewReleases = async () => {
    const res = await fetch(
      `https://api.spotify.com/v1/browse/new-releases?country=US`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${ls.get("token")}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    setNewReleases(data?.albums?.items);
  };

  //getAlubumdetails
  const getAlbum = (id) => {
    spotifyApi.getAlbum(id).then(
      function (data) {
        setAlbum(data);
        setLoaded(true);
        console.log("Albums information", data);
      },
      function (err) {
        console.error(err);
      }
    );
  };

  const logOut = () => {};

  useEffect(() => {
    getPlaylists();
    getUser();
    fetchCategories();
    fetchNewReleases();
  }, [token]);

  return (
    <WrappedComponent
      user={user}
      token={token}
      playlist={playlist}
      newReleases={newReleases}
      album={album}
      getAlbum={getAlbum}
      researchResults={researchResults}
      loaded={loaded}
      getResearch={getResearch}
      {...props}
    />
  );
};

export default withUser;
