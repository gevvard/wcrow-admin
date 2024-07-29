import axios from "axios";
import requests from "../../services";

const addNewUser = (data) => async (dispatch) => {

  dispatch({type: "LOADING",});
  try {
    const response = await axios.post(`http://localhost:8080/auth/register`, data);
    dispatch({
      type: "REGISTER",
      payload: response.data,
    });
    dispatch({ type: "NO_LOADING" });
  } catch (error) {
    console.log(error);
    dispatch({ type: "NO_LOADING" });
  }
};

export default addNewUser;
