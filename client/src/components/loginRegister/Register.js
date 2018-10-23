import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerProfile } from "../../actions/loginRegisterActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const newProfile = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registerProfile(newProfile, this.props.history);
  }
  render() {
    const errors = this.state.errors;
    const error = errors.toString();
    return (
      <div className="register" style={{ color: "white" }}>
        <div className="container">
          <div className="row">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <p className="lead text-center">
                  Register your Profile or{" "}
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Login to your account
                  </Link>
                </p>
                <p style={{ color: "red" }}>{error.toUpperCase()}</p>
                <label htmlFor="name">Name:</label>
                <input
                  onChange={this.onChange}
                  type="name"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <input
                  onChange={this.onChange}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <input
                  onChange={this.onChange}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                />
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerProfile: PropTypes.func.isRequired,
  loginRegister: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  loginRegister: state.loginRegister,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerProfile }
)(withRouter(Register));
