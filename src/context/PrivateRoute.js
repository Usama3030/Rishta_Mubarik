// src/components/PrivateRoute.js
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;
