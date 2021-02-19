import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useStateProviderValue } from "../StateProvider";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { loginUrl, fetchToken } from "../utils/spotify";
import queryString from "query-string";
import SpotifyWebApi from "spotify-web-api-js";
import ls from "local-storage";
import axios from "axios";
const spotifyApi = new SpotifyWebApi();

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest) =>
  axios.post(`${process.env.REACT_APP_API_URI}/api/auth/refresh`);
createAuthRefreshInterceptor(axios, refreshAuthLogic);

const withUser = (WrappedComponent) => (props) => {
  const [{ token }, dispatch] = useStateProviderValue();
  const [playlist, setPlaylist] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [researchResults, setResearchResults] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState("");

  const [album, setAlbum] = useState("");
  const history = useHistory();

  useEffect(() => {}, []);

  //set the token to make api requests
  spotifyApi.setAccessToken(ls.get("token"));

  // //after getting the token, I want to get the user
  // const getUser = async () => {
  //   if (ls.get("token")) {
  //     spotifyApi.setAccessToken(ls.get("token"));
  //     let currentUser = await spotifyApi.getMe();
  //     if (currentUser) {
  //       setUser(currentUser);
  //     }
  //   }
  // };

  //after getting the token, I want to get the current user
  const getCurrentUser = async () => {
    const res = await axios(`${process.env.REACT_APP_API_URI}/api/spotify/me`, {
      withCredentials: true,
    });

    const data = await res.data;
    if (data) {
      setUser(data);
    }
  };

  //after getting the token, I want to get the current user
  const logout = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URI}/api/auth/logout`,
      {
        withCredentials: true,
      }
    );

    const data = await res.data;
    if (data) {
      setUser("");
      history.push("/login");
    }
  };

  //after getting the token, I want to get the current user
  const getPlaylists = async () => {
    const res = await axios(
      `${process.env.REACT_APP_API_URI}/api/spotify/me/playlist`,
      {
        withCredentials: true,
      }
    );

    const data = await res.data;
    console.log(data);
    if (data) {
      setPlaylist(data.items);
      console.log(data);
    }
  };
  //get all current user playlist
  // const getPlaylists = () => {
  //   return spotifyApi.getUserPlaylists(user?.id).then(
  //     function (data) {
  //       setPlaylist(data.items);
  //       console.log("User playlists", data.items);
  //     },
  //     function (err) {
  //       console.error(err);
  //     }
  //   );
  // };

  // const getResearch = (q, t) => {
  //   spotifyApi.searchAlbums(q).then(
  //     function (data) {
  //       setResearchResults(data);
  //       setLoaded(!loaded);
  //       console.log(data);
  //     },
  //     function (err) {
  //       console.error(err);
  //     }
  //   );
  // };

  //search
  const getResearch = async (q) => {
    const res = await axios(
      `${process.env.REACT_APP_API_URI}/api/spotify/search?q=${q}`,
      {
        withCredentials: true,
      }
    );

    const data = await res.data;
    console.log(data);
    if (data) {
      setResearchResults(data);
      setLoaded(!loaded);
    }
  };

  //get all categories
  const fetchCategories = async () => {
    try {
      console.log("fetchaios");
      const res = await axios(
        `${process.env.REACT_APP_API_URI}/api/spotify/categories`,
        {
          withCredentials: true,
        }
      );
      const data = await res.data;
      setCategories(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  //get all new releases
  const fetchNewReleases = async () => {
    const res = await axios(
      `${process.env.REACT_APP_API_URI}/api/spotify/new-releases`,
      {
        withCredentials: true,
      }
    );

    const data = await res.data;
    console.log(data.data);
    setNewReleases(data.data?.albums?.items);
    console.log(newReleases);
  };

  //getAlubumdetails
  // const getAlbum = (id) => {
  //   spotifyApi.getAlbum(id).then(
  //     function (data) {
  //       setAlbum(data);
  //       setLoaded(true);
  //       console.log("Albums information", data);
  //     },
  //     function (err) {
  //       console.error(err);
  //     }
  //   );
  // };
  const getAlbum = async (id) => {
    console.log(id);
    const res = await axios(
      `${process.env.REACT_APP_API_URI}/api/spotify/album/${id}`,
      {
        withCredentials: true,
      }
    );

    const data = await res.data;
    setAlbum(data);
    setLoaded(true);
    console.log("Albums information", data);
  };

  const logOut = () => {};

  useEffect(() => {
    getPlaylists();
    fetchCategories();
    fetchNewReleases();
    getCurrentUser();
  }, []);

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
      fetchNewReleases={fetchNewReleases}
      logout={logout}
      {...props}
    />
  );
};

export default withUser;
