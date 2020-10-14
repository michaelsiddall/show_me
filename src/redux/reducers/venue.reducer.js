const venueReducer = (state = [], action) => {
  console.log("in venueReducer");

  switch (action.type) {
    case "SET_VENUE":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.artist
export default venueReducer;
