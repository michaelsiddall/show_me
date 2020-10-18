const spotifyIdReducer = (state = "", action) => {
  console.log("spotifyIdReducer payload is", action.payload);

  switch (action.type) {
    case "SET_SPOTIFY_ID":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.artist
export default spotifyIdReducer;
