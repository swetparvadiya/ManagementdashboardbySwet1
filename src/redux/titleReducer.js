

const titleReducer = (state="",action) => {
    switch (action.type) {
        case "CHANGE-TITLE":
            return action.payload.string;
        default:
            return state;
    }
}

export default titleReducer;