const discriptionReducer = (state = "", action) => {
  switch (action.type) {
    case "CHANGE-DISCRIPTION":
      return action.payload.string;
    default:
      return state;
  }
};

export default discriptionReducer;
