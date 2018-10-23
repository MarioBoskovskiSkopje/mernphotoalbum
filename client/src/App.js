import React, { Component } from "react";
import Register from "./components/loginRegister/Register";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./privateRoute.js/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/loginRegister/Login";
import UploadImage from "./components/uploadImage/UploadImage";

import {
  clearCurrentProfile,
  logoutProfile,
  setCurrentUser
} from "./actions/loginRegisterActions";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutProfile());
    store.dispatch(clearCurrentProfile());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App" style={{ backgroundColor: "#2c3e50" }}>
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Switch>
              <Redirect exact from="/" to="/login" />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/upload" component={UploadImage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
