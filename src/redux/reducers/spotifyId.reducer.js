const spotifyIdReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_SPOTIFY_ID":
      return action.payload;
    default:
      return state;
  }
};

export default spotifyIdReducer;
