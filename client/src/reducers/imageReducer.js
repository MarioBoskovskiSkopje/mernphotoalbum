import { GET_IMAGES, DELETE_IMAGE } from "../actions/types";

// const initalState = {
//   images: []
// };

export default function(state = [], action) {
  switch (action.type) {
    case GET_IMAGES: {
      return action.payload.images;
    }
    case DELETE_IMAGE: {
      return state.filter(el => el._id !== action.payload);
    }

    default:
      return state;
  }
}
