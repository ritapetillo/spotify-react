import React, { useState, useEffect } from "react";
import withUser from "./withUser";
import { Card, Col, Container, Row , Table} from "react-bootstrap";
import "../Styles/Playlist.css";
import AlbumDetails from "./AlbumDetails";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SingleSong from "./SingleSong";
import TopBarUser from "./TopBarUser";



const PlayList = ({ match, album, getAlbum, loaded }) => {
  const getCurrentAlbum = async () => {
    await getAlbum(match.params.id);
    console.log(album);
  };

  useEffect(() => {
    getCurrentAlbum();
  }, [loaded]);
  return (
      <Container className="playlist">
          <TopBarUser/>
      {album && <AlbumDetails album={album} />}
      <div className="playlist__bottom">
        <Row className="d-flex align-items-center">
                  <PlayCircleFilledIcon />
                  <FavoriteBorderIcon />
                  <MoreHorizIcon />
              </Row>
              <Row>
                  <Table hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Time</th>
     
    </tr>
  </thead>
  <tbody>
                          {album && album.tracks.items.map(track => <SingleSong track={track}/>)}
  </tbody>
</Table>
              </Row>
      </div>
    </Container>
  );
};

export default withUser(PlayList);
