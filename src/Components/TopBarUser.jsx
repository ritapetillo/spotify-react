import React, { useState, useEffect } from "react";
import withUser from "./withUser";
import { Row } from 'react-bootstrap'
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import '../Styles/TopBarUser.css'
import { useStateProviderValue } from "../StateProvider";
import {withRouter} from 'react-router-dom'



function TopBarUser({user,loaded,history}) {

    console.log(user)
    useEffect(() => {
        console.log(user)
    },[])
    
    return (
      <Row className="topbaruser d-flex justify-content-between">
        {user && (
          <>
            {" "}
            <div className="topbaruserIcons">
              <ArrowBackIosIcon
                className="arrowback"
                onClick={() => history.goBack()}
              />
              <NavigateNextIcon onClick={() => history.goForward()} />
            </div>
            <div className="d-flex align-items-center">
              <h6 className="mr-4">{user.display_name}</h6>
              <img src={user.images[0].url}></img>
            </div>{" "}
          </>
        )}
      </Row>
    );
}

export default withRouter(withUser(TopBarUser))
