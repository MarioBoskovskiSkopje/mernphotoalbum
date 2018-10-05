import React, { Component } from "react";
import { getImages, deleteImage } from "../../actions/imageActions";
import { getCurrentProfile } from "../../actions/loginRegisterActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import DeleteItem from "../deleteItem/DeleteItem";
import Spinner from "../spinner/Spinner";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.renderImages = this.renderImages.bind(this);
  }

  componentDidMount() {
    this.props.getImages();
    console.log(this.props.user);
  }
  renderImages() {
    return this.props.images.map((img, index) => {
      return (
        <div key={index}>
          <DeleteItem id={img._id} />
          <img
            style={{ width: "350px", height: "130px" }}
            key={img._id}
            src={`http://localhost:5000${img.imgPath}`}
            alt="Sample photo"
          />
        </div>
      );
    });
  }

  render() {
    const { images } = this.props;
    const { name } = this.props.user;
    return images !== undefined && images.length > 0 ? (
      <div>
        <Navbar name={name} />
        <main className="grid">{this.renderImages()}</main>
      </div>
    ) : (
      <Spinner />
    );
  }
}

Dashboard.propTypes = {
  getImages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  images: state.imageReducer,
  profile: state.profile,
  user: state.loginRegister.user
});

export default connect(
  mapStateToProps,
  { getImages, deleteImage }
)(Dashboard);
