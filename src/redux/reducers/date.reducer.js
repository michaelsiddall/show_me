const dateReducer = (state = "", action) => {
  //

  switch (action.type) {
    case "SET_DATE":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.artist
export default dateReducer;
