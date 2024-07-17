import axios from "axios";
import requests from "../../services";

const addContactUsData = (data, token) => async (dispatch) => {

  dispatch({
    type: "LOADING",
  });
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(requests.data, data, config);
    dispatch({
      type: "CONTACT_US",
      payload: response.data,
    });
    dispatch({ type: "NO_LOADING" });
  } catch (error) {
    console.log(error);
    dispatch({ type: "NO_LOADING" });
  }
};

export default addContactUsData;
