const songKickIdReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_SONGKICK_ID":
      return action.payload;
    default:
      return state;
  }
};

export default songKickIdReducer;
