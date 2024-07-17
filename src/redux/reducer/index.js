import {combineReducers} from "redux";
import loading from "./loading";
import signIn from "./signIn";
import contactUs from "./contactUs";
import {mimoDataReducer} from "./mimoData";
import registerData from "./register";

const rootReducer = combineReducers({
  registerData,
  loading,
  signIn,
  contactUs,
  mimoDataReducer

});
export default rootReducer