import React, { Component } from "react";
import {
  clearCurrentProfile,
  logoutProfile
} from "../../actions/loginRegisterActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutProfile();
  }

  randomAvatar() {
    let arrImg = [
      "https://www.w3schools.com/w3css/img_lights.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6otfl5HmcfL6UAXpJTkGsAE_ImAoVpIAmlPAW9xrKzDzdm35K",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5mL5fAA-1_5F_nYbSSt3RbCvdTN1C5fsUWvB9lUnZZ5gxYJq_Q",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ktlwSh8RQGskNFUfNSyfHZYLe-Duiu8BgQMb3JEw9uLV7KpbmA",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe0ub78kIqvmA13W9Sr6VdDcu0ciXwScvgKgDKQuitqLAQoUxJng",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAGBfyR6GAv1d2ee0Q8ySsO2KMZdnyGZc0Vh1DkfvBiGcFQApa",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ84hMKGYnLjbYASltpjWRIIumEGrwWPmkDFVkkr4hppCPekUIY"
    ];
    let randomNum = Math.floor(Math.random() * arrImg.length);
    return (
      <div>
        <h4>{this.props.name}</h4>
        <img
          src={arrImg[randomNum]}
          style={{ height: "150px", width: "180px", borderRadius: "50%" }}
        />
      </div>
    );
  }

  render() {
    const logoutLink = (
      <div
        style={{
          backgroundColor: "#ecf0f1",
          textAlign: "center",
          marginBottom: "10px",
          fontSize: "20px"
        }}
      >
        {this.randomAvatar()}
        <Link to="/upload" style={{ paddingRight: "50px" }}>
          Upload a image
        </Link>
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
