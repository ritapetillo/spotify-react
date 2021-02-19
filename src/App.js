import React, { useState, useEffect } from "react";
import queryString from "query-string";
import ls from "local-storage";
import SpotifyWebApi from "spotify-web-api-js";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Login from "./Components/Login";
import { Route, Switch, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import { loginUrl, fetchToken } from "./utils/spotify";
import Player from "./Components/Player";
import { useStateProviderValue } from "./StateProvider";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";
import PlayList from "./Components/PlayList";
import Search from "./Components/Search";

const spotifyApi = new SpotifyWebApi();

function App() {
  const [r_token, setR_token] = useState(null);
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [{ user }, dispatch] = useStateProviderValue();
  const location = useLocation();

  //get token and refresh token function
  const getToken = async (code) => {
    try {
      let res = await fetchToken(code);
      if (res.access_token) {
        ls.set("token", res.access_token);
        ls.set("refresh_token", res.refresh_token);
        dispatch({
          type: "SET_TOKEN",
          token: ls.get("token"),
          refreshToken: ls.get("refresh_token"),
        });
        setToken(res.access_token);
        setR_token(res.refresh_token);
        getUser(res.access_token);
      }
    } catch (e) {}
  };

  //after getting the token, I want to get the user
  const getUser = async (token) => {
    if (token) {
      spotifyApi.setAccessToken(token);
      let currentUser = await spotifyApi.getMe();
      if (currentUser) {
        setCurrentUser(currentUser);

        dispatch({
          type: "SET_USER",
          user: currentUser,
        });
      }
    }
  };

  useEffect(() => {
    const search = queryString.parse(window.location.search);
    const code = search["code"];
    if (code) {
      getToken(code);
    }
  }, []);

  return (
    <div className="app">
      <Route exact path="/login" component={Login} />
      {location.pathname !== "/login" && <Sidebar />}
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route
        exact
        path="/playlist/:id"
        render={(props) => <PlayList {...props} />}
      />
      <Route exact path="/search" render={(props) => <Search {...props} />} />

      {location.pathname !== "/login" && <Footer />}
    </div>
  );
}

export default App;
