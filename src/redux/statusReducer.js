const statusReducer = (state = "", action) => {
  switch (action.type) {
    case "CHANGE-STATUS":
      return action.payload.string;
    default:
      return state;
  }
};

export default statusReducer;
