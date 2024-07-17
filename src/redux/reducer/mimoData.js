 const initialStat= {
  data:[]
 }
 export const mimoDataReducer = (state=initialStat,action)=>{
  switch (action.type) {
    case "GET_MIMO_DATA":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
  }
