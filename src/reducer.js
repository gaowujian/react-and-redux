const initialState = {};
function reducer(state = initialState, action) {
  switch (action.type) {
    case "plus":
      return {
        ...state,
        age: state.age + 1,
      };
    case "subtract":
      return {
        ...state,
        age: state.age - 1,
      };
    default:
      return initialState;
  }
}

export default reducer;
