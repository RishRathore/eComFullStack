import axios from "axios";
import { toast } from "react-toastify";

import * as actions from "./actionCreators";
import { API_BASE_URL } from "../config/config";

const baseURL = API_BASE_URL;

//cart

export const getMyCart = (userId) => (dispatch) => {
  return axios
    .get(`${baseURL}/carts/${userId}`)
    .then((res) => {
      dispatch(actions.successGetCarts(res?.data));
    })
    .catch((error) => {
      toast("Fetching cart Failed!", { type: "error" });
    });
};

export const addToCart = (data, userId) => () => {
  return axios
    .post(`${baseURL}/cart/${userId}`, { productId: data._id })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      const errMsg = error?.response?.data || 'Unable to Add!'
      toast(errMsg, { type: "warning" });
    });
};

export const removeCart = (cartId, prodId) => () => {
  return axios
    .delete(`${baseURL}/cart/${cartId}`, { data: { productId: prodId } })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      toast("Remove Product Failed!", { type: "error" });
    });
};

export const updateCart =
  ({ id, operationType, productId, quantity, userId }) =>
    (dispatch) => {
      return axios
        .post(`${baseURL}/updadteCart/${id}`, { operationType, productId, quantity }
        )
        .then((res) => {
          if (res) {
            dispatch(getMyCart(userId));
          }
        })
        .catch((error) => {
          const errMsg = error?.response?.data || 'Something went wrong!'
          toast(errMsg, { type: "error" });
        });
    };

//product

export const getProductsList = () => (dispatch) => {
  return axios
    .get(`${baseURL}/products`)
    .then((res) => {
      dispatch(actions.getProductDetails(res?.data));
    })
    .catch((error) => {
      toast.error("Something went wrong!");
      console.log("error", error);
    });
};

export const createProduct = (data) => (dispatch) => {
  return axios
    .post(`${baseURL}/addProduct`, data)
    .then((res) => {
      if (res) {
        dispatch(getProductsList());
        toast("Product added", { type: "success" });
        return true
      }
    })
    .catch((error) => {
      console.log("error", error);
      toast.error("Something went wrong!");
    });
};

export const getSearchProductsList = (data) => (dispatch) => {
  return axios
    .get(`${baseURL}/products?name=${data}`)
    .then((res) => {
      dispatch(actions.getProductDetails(res?.data));
    })
    .catch((error) => {
      console.log("error", error);
    });
};

//orders

export const getordersList = (userId) => (dispatch) => {
  return axios
    .get(`${baseURL}/orders/${userId}`)
    .then((res) => {
      dispatch(actions.getOrder(res?.data));
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const placeOrder = (userId, data) => (dispatch) => {
  return axios
    .post(`${baseURL}/order/${userId}`, data)
    .then((res) => {
      res && dispatch(getordersList());
      toast.success(res.data);
    })
    .catch((error) => {
      const errMsg = error?.response?.data?.message || 'Something went wrong!'
      toast(errMsg, { type: "error" });
      console.log("error", error);
      toast(errMsg, { type: "error" });

    });
};

// user

export const userLogin = (data) => () => {
  return axios
    .post(`${baseURL}/login`, data)
    .then((res) => res)
    .catch((error) => {
      const errMsg = error?.response?.data?.message || 'Login Failed!'
      toast(errMsg, { type: "error" });
    });
};

export const userSignup = (data) => () => {
  return axios
    .post(`${baseURL}/signup`, data)
    .then((res) => res)
    .catch((error) => {
      const errMsg = error?.response?.data?.message || 'Registration Failed!'
      toast(errMsg, { type: "error" });
    });
};

export const getUser = () => (dispatch) => {
  return axios
    .get(`${baseURL}/user`)
    .then((res) => {
      dispatch(actions.getUserInfo(res?.data));
    })
    .catch((error) => {
      console.log("error", error);
    });
};
