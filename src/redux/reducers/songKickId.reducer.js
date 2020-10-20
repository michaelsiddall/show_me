const songKickIdReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_SONGKICK_ID":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.artist
export default songKickIdReducer;
