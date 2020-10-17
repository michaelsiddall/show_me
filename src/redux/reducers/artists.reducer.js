const artistsReducer = (state = [], action) => {
  console.log("artistReducer payload is", action.payload);

  switch (action.type) {
    case "SET_ARTIST":
      return action.payload.artists;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.artist
export default artistsReducer;
