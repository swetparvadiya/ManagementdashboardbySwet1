const selectReducer = (state = "", action) => {
  switch (action.type) {
    case "CHANGE-SELECT":
      return action.payload.string;
    default:
      return state;
  }
};

export default selectReducer;
