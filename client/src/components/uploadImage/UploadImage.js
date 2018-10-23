import React from "react";
import axios from "axios";
import { connect } from "react-redux";

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("/api/photo", formData, config)
      .then(response => {
        alert(response.data);
        if (response.data === "Success uploading") {
          this.props.history.push("/dashboard");
        }
      })
      .catch(error => {});
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <h1 style={{ color: "white" }}>File Upload</h1>
          <input
            type="file"
            name="myImage"
            onChange={this.onChange}
            style={{
              border: "2px solid gray",
              color: "gray",
              backgroundColor: "white",
              padding: "8px 20px",
              borderRadius: "8px",
              fontSize: "20px",
              fontWeight: "bold"
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              border: "none",
              color: "white",
              padding: "15px 32px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              margin: "4px 2px",
              cursor: "pointer"
            }}
          >
            Upload
          </button>
          <button
            style={{
              backgroundColor: "#f44336",
              border: "none",
              color: "white",
              padding: "15px 32px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              margin: "4px 2px",
              cursor: "pointer"
            }}
            onClick={() => {
              this.props.history.push("/dashboard");
            }}
          >
            Back To Dashboard
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(UploadImage);
