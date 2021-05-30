const getArtistsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ARTIST":
      return action.payload;
    default:
      return state;
  }
};

export default getArtistsReducer;
