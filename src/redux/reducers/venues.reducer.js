const venuesReducer = (state = [], action) => {
  console.log("in venuesReducer");

  switch (action.type) {
    case "SET_VENUE":
      return action.payload.venues;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.artist
export default venuesReducer;
