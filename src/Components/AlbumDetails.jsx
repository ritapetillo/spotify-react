import React from 'react'
import { Card, Col, Container, Row } from "react-bootstrap";


function AlbumDetails({album}) {
    return (
      <Row className="mt-4 playlist__details">
        <Col md={3}>
          <img className="img-fluid" src={album?.images[0]?.url} alt="" />
        </Col>
        <Col md={9} className="d-flex flex-column justify-content-end">
          <h6 style={{ textTransform: "uppercase" }}>{album.type}</h6>
          <h1 className="playlist__album-title">{album.name}</h1>
          <h6>
            {album.artists.map((artist) => artist.name)} -{" "}
            {album.release_date.substring(0, 4)} - {album.total_tracks} tracks
          </h6>
        </Col>
      </Row>
    );
}

export default AlbumDetails
