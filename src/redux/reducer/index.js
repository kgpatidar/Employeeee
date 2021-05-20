import { combineReducers } from "redux";

import userReducer from "./userReducer";

//COMBINING ALL REDUCER
export default combineReducers({
  user: userReducer,
});
