import axios from "axios";
import requests from "../../services";

export const signIn = (data) => async (dispatch) => {
  console.log("data",data)
  dispatch({
    type: "LOADING",
  });
  try {
    const response = await axios.post(`http://localhost:8080/auth/login`,data);
    dispatch({
      type: "SignIn",
      payload: response.data,
    });
    dispatch({
      type: "NO_LOADING",
    });
    if (response.data) {
      dispatch({
        type: "SIGN_IN",
        payload: response.data,
      });
      localStorage.setItem("token", response.data.content.token);
    }
  } catch (e) {
    console.log(e);
    dispatch({
      type: "NO_LOADING",
    });
  }
};
