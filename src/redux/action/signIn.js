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
    // response.data ? localStorage.setItem("token", response.data.content.token):"";
    console.log("token",response.data)
    if (response.data) {
      localStorage.setItem("token", response.data.accessToken);
      dispatch({
        type: "SIGN_IN",
        payload: response.data,
      });


    }
  } catch (e) {
    console.log(e);
    dispatch({
      type: "NO_LOADING",
    });
  }
};
