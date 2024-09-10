import axios from "axios";

let baseUrl = import.meta.env.VITE_BASE_API;

const http = axios.create({ baseURL: baseUrl });

http.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("accesstoken");
    if (accessToken) {
      request.headers["authorization"] = `${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use((response) => response),
  (error) => Promise.reject(error);


export default http;
