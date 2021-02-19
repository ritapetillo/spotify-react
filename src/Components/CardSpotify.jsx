import React from 'react'
import { Card, Col, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../Styles/Card.css'
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

export default function CardSpotify({image,name,artists,id}) {
    return (
      <Col md={4} lg={3} className="cardSpotify">
        <Link to={`playlist/${id}`}>
        <Card className="cardSpotify-card">
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <PlayCircleFilledIcon />
            <Card.Title className="cardSpotify-card-title">{name}</Card.Title>
            <Card.Text className="cardSpotify-card-text line-clamp">
              <p>
                {artists.map((artist) => (
                  <span>{artist.name}<br/></span>
                ))}
              </p>
            </Card.Text>
          </Card.Body>
          </Card>
        </Link>
      </Col>
    );
}
