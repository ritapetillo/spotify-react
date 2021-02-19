import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useStateProviderValue } from "../StateProvider";
import ls from "local-storage";



const PrivateRoute = ({ component: Component, ...rest }) => {
      // const [{ user, token }, dispatch] = useStateProviderValue();

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        ls.get('token') ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
