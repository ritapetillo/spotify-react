import React, { useState, useEffect } from "react";
import queryString from "query-string";
import withUser from "./withUser";
import Sidebar from './Sidebar'
import { Card, Col,Container,Row} from "react-bootstrap";
import '../Styles/Home.css'
import CardSpotify from "./CardSpotify";
import { NewReleases } from "@material-ui/icons";
import TopBarUser from "./TopBarUser";



function Home({ user, token, newReleases }) {
  
  useEffect(() => {
    console.log(newReleases);
   
  },[newReleases]);
  return (
    <Container className="home">
    <TopBarUser/>
      <Row>
        <h4 className="my-4 ml-2">New Releases</h4>
      </Row>
      <Row>
        {newReleases?.map((item) => (
          <CardSpotify image={item.images[0].url} name={item.name} artists={item.artists} id={item.id}/>
        ))}
      </Row>
    </Container>
  );
}

export default withUser(Home);
