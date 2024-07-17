import axios from "axios";
import requests from "../../services";

export const getDataThunk = ()=>async (dispatch)=>{
  dispatch({
    type: "LOADING",
  });
  try{
    const response = await axios.get(requests.data)
    dispatch({
      type:'GET_MIMO_DATA',
      payload:response.data
    })
    dispatch({
      type: "NO_LOADING",
    });
  }
  catch (e){
    console.log(e)
    dispatch({
      type: "NO_LOADING",
    });
  }
}