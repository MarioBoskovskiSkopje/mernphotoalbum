import React, { Component } from "react";
import { getImages, deleteImage } from "../../actions/imageActions";
import { getCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
    this.props.getCurrentProfile();
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
    return images !== undefined && images.length > 0 ? (
      <div>
        <Navbar />
        <main className="grid">
          {this.renderImages()}

          <Link to="/upload">Upload a image</Link>
        </main>
      </div>
    ) : (
      <Spinner />
    );
  }
}

Dashboard.propTypes = {
  getImages: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
  //profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  images: state.imageReducer,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getImages, getCurrentProfile, deleteImage }
)(Dashboard);
