const getArtistsReducer = (state = [], action) => {
  console.log("artistReducer payload is", action.payload);

  switch (action.type) {
    case "GET_ARTIST":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.artist
export default getArtistsReducer;
