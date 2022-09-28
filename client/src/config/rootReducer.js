import { combineReducers } from "redux";
import reducer from "../reducer/index";

const rootReducer = combineReducers({
  data: reducer,
});

export default rootReducer;
