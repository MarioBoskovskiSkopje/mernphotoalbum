import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteImage } from "../../actions/imageActions";

class DeleteItem extends Component {
  deleteClick(imgId) {
    this.props.deleteImage(imgId);
  }
  render() {
    const { id } = this.props;

    return (
      <div>
        <button onClick={this.deleteClick.bind(this, id)}>x</button>
      </div>
    );
  }
}

DeleteItem.propTypes = {
  deleteImage: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteImage }
)(DeleteItem);
