const artistsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ARTIST":
      return action.payload.artists;
    default:
      return state;
  }
};

export default artistsReducer;
