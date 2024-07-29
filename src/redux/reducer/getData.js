const initialState = { getData: {} };
const getDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        getData: action.payload,
      };
    default:
      return state;
  }
};
export default getDataReducer;
