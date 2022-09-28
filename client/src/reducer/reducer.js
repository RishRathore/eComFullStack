import * as constants from "../constant";

//cart
const cartReducer = (state, action) => ({
  ...state,
  cartItem: action.CartList,
});

//get-user
const requestLoginUser = (state, action) => ({
  ...state,
  user: [],
});

const successLoginUser = (state, action) => ({
  ...state,
  user: action.payload,
});

const failLoginUser = (state, action) => ({
  ...state,
  user: [],
});

//product
const productReducer = (state, action) => ({
  ...state,
  products: action?.Products,
});

//order
const getOrder = (state, action) => ({
  ...state,
  orders: action?.orders,
});

//user
const getUserInfo = (state, action) => ({
  ...state,
  userData: action.payload,
  isLoggedIn: true,
});

const removeUser = (state, action) => ({
  ...state,
  userData: null,
  isLoggedIn: false,
});

export const setReducer = {
  [constants.GET_CARTS]: cartReducer,
  [constants.LOGIN_BEGIN]: requestLoginUser,
  [constants.LOGIN_SUCCESS]: successLoginUser,
  [constants.LOGIN_FAILURE]: failLoginUser,
  [constants.GET_PRODUCTS]: productReducer,
  [constants.GET_USER_INFO]: getUserInfo,
  [constants.REMOVE_USER]: removeUser,
  [constants.GET_ORDER]: getOrder,
}; 
