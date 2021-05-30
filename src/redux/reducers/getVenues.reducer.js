const getVenuesReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_VENUES":
      return action.payload;
    default:
      return state;
  }
};

export default getVenuesReducer;
