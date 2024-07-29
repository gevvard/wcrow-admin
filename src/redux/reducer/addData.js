const initialState = { data: {} };
const addDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        reg: action.payload,
      };
    default:
      return state;
  }
};
export default addDataReducer;
