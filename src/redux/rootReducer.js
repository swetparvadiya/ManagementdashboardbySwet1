import { combineReducers } from "redux";
import userReducer from "./reducer";
import bodyRed from "./Body";
import bodyReducer from "./bodyReducer";
import discriptionReducer from "./discriptionChange";
import notesReducer from "./notesReducers";
import titleReducer from "./titleReducer";
import selectReducer from "./selectChange";
import statusReducer from "./statusReducer";

const rootReducer = combineReducers({
  user: userReducer,
  notes: notesReducer,
  title: titleReducer,
  body: bodyReducer,
  bodyRed: bodyRed,
  discription: discriptionReducer,
  select: selectReducer,
  status: statusReducer,
});

export default rootReducer;
