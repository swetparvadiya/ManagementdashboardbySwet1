const myState = [];

const notesReducer = (state = myState, action) => {
  switch (action.type) {
    case "ADD":
      let { id, title } = action.payload;
      return [...state, { id, title }];
    case "REMOVE":
      let filtered = state.filter((el) => el.id !== action.payload.id);
      return filtered;
    case "REMOVE_ALL":
      return [];
    default:
      return state;
  }
};

export default notesReducer;
