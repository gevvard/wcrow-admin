const initialState = { user: null };

const signIn = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      // alert('yey')
      return {
        // ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return{
        user:null
      }
    default:
      return state;
  }
};
export default signIn;
