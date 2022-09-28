import axios from "axios";
import { toast } from "react-toastify";

import * as actions from "./actionCreators";
import { API_BASE_URL } from "../config/config";

const baseURL = API_BASE_URL;

//cart

export const getAllCarts = () => (dispatch) => {
  return axios
    .get(`${baseURL}/carts`)
    .then((res) => {
      dispatch(actions.successGetCarts(res?.data));
    })
    .catch((error) => {
      toast("Fetching cart Failed!", { type: "error" });
    });
};

export const addToCart = (data, userId) => () => {
  return axios
    .post(`${baseURL}/cart/${data._id}`, { userId })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      toast("Product not added!", { type: "error" });
    });
};

export const removeCart = (id) => () => {
  return axios
    .delete(`${baseURL}/cart`, id)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      toast("Remove Product Failed!", { type: "error" });
    });
};

export const updateCart =
  ({ id, operationType, productId }) =>
  (dispatch) => {
    return axios
      .patch(`${baseURL}/cart/${id}`, { operationType, productId })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        toast("Product update Failed!", { type: "error" });
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
      console.log("error", error);
    });
};

export const createProduct = (data) => (dispatch) => {
  return axios
    .post(`${baseURL}/addProduct`, data)
    .then((res) => {
      res && dispatch(getProductsList());
      toast("Product added", { type: "success" });
    })
    .catch((error) => {
      console.log("error", error);
      toast("Something went wrong!", { type: "error" });
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

export const getordersList = () => (dispatch) => {
  return axios
    .get(`${baseURL}/orders`)
    .then((res) => {
      dispatch(actions.getOrder(res?.data));
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const placeOrder = () => (dispatch) => {
  return axios
    .get(`${baseURL}/place-orders`)
    .then((res) => {
      res && dispatch(getordersList());
    })
    .catch((error) => {
      console.log("error", error);
    });
};

//user

export const userLogin = (data) => (dispatch) => {
  return axios
    .post(`${baseURL}/login`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      toast("User Login Failed!", { type: "error" });
    });
};

export const userSignup = (data) => (dispatch) => {
  return axios
    .post(`${baseURL}/signup`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      toast("Registration Failed!", { type: "error" });
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
