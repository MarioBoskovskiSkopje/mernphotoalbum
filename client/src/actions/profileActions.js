import axios from "axios";

import { GET_CURRENT_PROFILE } from "./types";

export const getCurrentProfile = () => dispatch => {
  // axios
  //   .get("api/profile/profiles/current")
  //   .then(res =>
  //     dispatch({
  //       type: GET_CURRENT_PROFILE,
  //       payload: res.data
  //     })
  //   )
  //   .catch(err => {
  //     dispatch({
  //       type: GET_CURRENT_PROFILE,
  //       payload: {}
  //     });
  //   });
};
