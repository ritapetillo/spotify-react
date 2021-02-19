import React, { useState, useEffect } from "react";
import queryString from "query-string";
import withUser from "./withUser";
import Sidebar from "./Sidebar";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../Styles/Home.css";
import CardSpotify from "./CardSpotify";
import { NewReleases } from "@material-ui/icons";
import TopBarUser from "./TopBarUser";

function Search({ user, token, loaded, researchResults, getResearch }) {
  useEffect(() => { 
    if (researchResults.albums) {console.log(researchResults.albums.items);}
  }, [loaded]);
  return (
    <Container className="home">
      <TopBarUser />
      <Row className="d-flex flex-column">
        <h4 className="my-4 ml-2 ">Search</h4>

        <input
          type="text"
          placeholder="Search an artist"
          style={{
            height: "40px",
            borderRadius: "20px",
            width: "50vw",
            padding: "5px 10px",
            outline: "none",
          }}
          onChange={(e) => getResearch(e.target.value)}
        />
      </Row>
      <Row>
        {researchResults.albums &&
          researchResults.albums.items?.map((item) => (
            <CardSpotify
              image={item.images[0].url}
              name={item.name}
              artists={item.artists}
              id={item.id}
            />
          ))}
      </Row>
    </Container>
  );
}

export default withUser(Search);
