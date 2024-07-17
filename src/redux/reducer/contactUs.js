const initialState = { contactUsData: {} };
const contactUs = (state = initialState, action) => {
  switch (action.type) {
    case "CONTACT_US":
      return {
        ...state,
        contactUsData: action.payload,
      };
    default:
      return state;
  }
};
export default contactUs;