import axios from "axios";
const API_URL = "http://localhost:5000/api/auth";

const axiosConfig = {
  withCredentials: true,
  baseURL: API_URL,
};
const apiAxiosInstance = axios.create(axiosConfig);

apiAxiosInstance.interceptors.request.use((config) => {
  config.headers = JSON.parse(localStorage.getItem("payload") || {});
  return config;
});

apiAxiosInstance.interceptors.response.use(
  (config) => config,
  async (err) => {
    const originalRequest = err.config;
    if (
      err?.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await axios.get("/refresh_token", {
          ...axiosConfig,
          headers: JSON.parse(localStorage.getItem("payload") || {}),
        });
        return apiAxiosInstance.request(originalRequest);
      } catch (err) {
        return err;
      }
    }
    localStorage.removeItem("payload");
    throw err;
  }
);

export default apiAxiosInstance;
