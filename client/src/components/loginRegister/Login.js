import React, { Component } from "react";
import { loginProfile } from "../../actions/loginRegisterActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.loginRegister.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginRegister.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginProfile(profileData, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div>
          <div className="loginmodal-container">
            <h1>Login to Your Account</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  name="email"
                  placeholder="User email"
                  onChange={this.onChange}
                  type="email"
                  value={this.state.email}
                  className="form-control"
                />
                <p style={{ color: "red" }}>{errors.email}</p>
              </div>
              <div className="form-group">
                <input
                  name="password"
                  placeholder="User password"
                  onChange={this.onChange}
                  type="password"
                  value={this.state.password}
                  className="form-control"
                />
                <p style={{ color: "red" }}>{errors.password}</p>
                <p style={{ color: "red" }}>{errors.data}</p>
              </div>
              <input
                type="submit"
                name="login"
                className="login loginmodal-submit"
              />
            </form>
          </div>
          <Link to="/register">Register your account</Link>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginProfile: PropTypes.func.isRequired,
  loginRegister: PropTypes.object.isRequired
  //errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loginRegister: state.loginRegister,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginProfile }
)(withRouter(Login));
