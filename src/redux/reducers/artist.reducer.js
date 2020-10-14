const artistReducer = (state = [], action) => {
  console.log("in artistReducer");

  switch (action.type) {
    case "SET_ARTIST":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.artist
export default artistReducer;
