const myState = [];

const bodyRed = (state = myState, action) => {
  switch (action.type) {
    case "ADDBODY": {
      let { id, body, discription, projectId, select, status } = action.payload;
      return [...state, { id, body, discription, projectId, select, status }];
    }

    case "REMOVEBODY":
      let filtered = state.filter((el) => el.id !== action.payload.id);
      return filtered;

    case "UPDATEBODY": {
      let { status } = action.payload;
      return [...state, { status }];
    }

    default:
      return state;
  }
};

export default bodyRed;
