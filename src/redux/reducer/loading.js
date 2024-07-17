const initialState = {
  isTrue: null
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isTrue: true
      };
    case 'NO_LOADING':
      return {
        ...state,
        isTrue: false
      };
    default:
      return state;
  }
};

export default loading;