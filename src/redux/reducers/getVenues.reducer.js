const getVenuesReducer = (state = [], action) => {
  console.log("getArtistReducer payload is", action.payload);

  switch (action.type) {
    case "GET_VENUES":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.artist
export default getVenuesReducer;
