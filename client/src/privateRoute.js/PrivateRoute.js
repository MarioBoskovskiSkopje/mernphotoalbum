import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, loginRegister, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loginRegister.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
PrivateRoute.propTypes = {
  loginRegister: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loginRegister: state.loginRegister
});

export default connect(mapStateToProps)(PrivateRoute);
