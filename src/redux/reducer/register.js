const initialState = { reg: {} };
const registerData = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        reg: action.payload,
      };
    default:
      return state;
  }
};
export default registerData;
