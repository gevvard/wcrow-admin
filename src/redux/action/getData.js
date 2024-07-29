import axios from "axios";
import requests from "../../services";

export const getDataThunk = ()=>async (dispatch)=>{
  dispatch({
    type: "LOADING",
  });
  try{
    const response = await axios.get(`http://localhost:8080/data`)
    dispatch({
      type:'GET_DATA',
      payload:response.data
    })
    console.log(response.data)
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