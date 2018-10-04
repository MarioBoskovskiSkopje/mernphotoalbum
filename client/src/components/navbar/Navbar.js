import React, { Component } from "react";
import {
  clearCurrentProfile,
  logoutProfile
} from "../../actions/loginRegisterActions";
import { connect } from "react-redux";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutProfile();
  }

  render() {
    //const localStorageToken = localStorage.jwtToken;
    const logoutLink = (
      <div
        style={{
          backgroundColor: "#ecf0f1",
          textAlign: "right",
          marginBottom: "10px",
          fontSize: "20px"
        }}
      >
        <a href="" onClick={this.onLogoutClick.bind(this)}>
          Logout
        </a>
      </div>
    );
    return <div>{logoutLink}</div>;
  }
}

export default connect(
  null,
  { logoutProfile, clearCurrentProfile }
)(Navbar);
