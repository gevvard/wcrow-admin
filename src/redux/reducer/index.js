import {combineReducers} from "redux";
import loading from "./loading";
import signIn from "./signIn";
import registerData from "./register";
import addDataReducer from "./addData";

const rootReducer = combineReducers({
  registerData,
  loading,
  signIn,
  addDataReducer


});
export default rootReducer