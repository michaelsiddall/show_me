const songKickIdReducer = (state = "", action) => {
  console.log("songKickIdReducer payload is", action.payload);

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
