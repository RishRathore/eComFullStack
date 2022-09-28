import { createReducer } from "../config/reduxUtils";
import { setReducer } from "./reducer";

const initialState = {
  cartItem: [],
  user: [],
  products: [],
  userData: null,
  isLoggedIn: false,
  orders: [],
};

const handlers = {
  ...setReducer,
};

const reducer = createReducer(initialState, handlers);

export default reducer;
