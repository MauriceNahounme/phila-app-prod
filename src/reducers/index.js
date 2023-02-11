import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import memberReducer from "./member.reducer";

export default combineReducers({
  userReducer,
  memberReducer,
});
