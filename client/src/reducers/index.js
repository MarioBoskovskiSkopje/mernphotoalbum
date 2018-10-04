import { combineReducers } from "redux";
import loginRegister from "./loginRegisterReducer";
import imageReducer from "./imageReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  loginRegister,
  imageReducer,
  errors: errorReducer
});
