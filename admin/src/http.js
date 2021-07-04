import axios from "axios";
import router from "./router";
import app from "./main";

const http = axios.create({
  baseURL: "http://localhost:3000/admin/api",
});

//添加token 请求头
http.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    if (localStorage.token) {
      config.headers.Authorization = "Bearer " + (localStorage.token || "");
    }

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

//响应
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.data.message) {
      app.config.globalProperties.$message({
        type: "error",
        message: err.response.data.message,
      });
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
    return Promise.reject(err);
  }
);

export default http;
