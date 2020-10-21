const reviewsReducer = (state = "", action) => {
  console.log("in reviewReducer", action.payload);

  switch (action.type) {
    case "SET_REVIEW":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.artist
export default reviewsReducer;
