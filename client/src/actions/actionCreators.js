import {
  GET_CARTS,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_PRODUCTS,
  GET_USER_INFO,
  REMOVE_USER,
  GET_ORDER,
} from "../constant";

export const successGetCarts = (result) => {
  return {
      type: GET_CARTS,
      CartList: result
  }
}

export const loginBegin = () => {
  return {
      type: LOGIN_BEGIN,
      payload: []
  }
}

export const loginSuccess = (result) => {
  return {
      type: LOGIN_SUCCESS,
      payload: result
  }
}

export const loginFailure = (error) => {
  return {
      type: LOGIN_FAILURE,
      payload: []
  }
}

export const getProductDetails = (result) => {
  return {
    type: GET_PRODUCTS,
    Products: result
  }
}

export const getUserInfo = (result) => {
  return {
    type: GET_USER_INFO,
    payload: result
  }
}

export const removeUser = () => {
  return {
    type: REMOVE_USER
  }
}

export const getOrder = (payload) => {
  return {
    type: GET_ORDER,
    orders: payload
  }
}



