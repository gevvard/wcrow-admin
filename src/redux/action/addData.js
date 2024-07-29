import axios from "axios";


const addData = (data) => async (dispatch, getState) => {
  console.log("data",data)
  dispatch({ type: "LOADING" });
  try {
    const token = getState().auth.token;
    console.log("token",token)
    const response = await axios.post(`http://localhost:8080/data`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "ADD_DATA",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: "NO_LOADING" });
  }
};

export default addData;
