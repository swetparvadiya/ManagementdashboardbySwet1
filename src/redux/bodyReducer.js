const bodyReducer = (state="",action) => {
    switch (action.type) {
        case "CHANGE-BODY":
            return action.payload.string;
        default:
            return state;
    }
}

export default bodyReducer;