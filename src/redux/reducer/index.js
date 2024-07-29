import {combineReducers} from "redux";
import loading from "./loading";
import signIn from "./signIn";
import registerData from "./register";
import addDataReducer from "./addData";
import getDataReducer from "./getData";

const rootReducer = combineReducers({
  registerData,
  loading,
  signIn,
  addDataReducer,
  getDataReducer



});
export default rootReducer