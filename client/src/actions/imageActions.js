import axios from "axios";

import { GET_IMAGES, DELETE_IMAGE } from "./types";

export const getImages = () => dispatch => {
  axios
    .get("/api/image/images")
    .then(res => {
      dispatch({
        type: GET_IMAGES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_IMAGES,
        payload: null
      })
    );
};

export const deleteImage = imageId => dispatch => {
  axios
    .delete(`/api/image/images/${imageId}`)
    .then(res =>
      dispatch({
        type: DELETE_IMAGE,
        payload: imageId
      })
    )
    .catch(err =>
      dispatch({
        type: GET_IMAGES,
        payload: null
      })
    );
};
