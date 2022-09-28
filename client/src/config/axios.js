import axios from "axios";

import { API_BASE_URL } from "./config";

axios.defaults.baseURL = API_BASE_URL;
// axios.defaults.withCredentials = true;

export const setupAxiosInterceptors = () => {
  const onRequestSuccess = (request) => {
    const token = localStorage.getItem("token") || null;
    if (token) {
      request.headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    }
    return request;
  };

  const onResponseSuccess = (response) => response;

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess);
};
