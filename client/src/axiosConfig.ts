import axios, { AxiosError } from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const axiosConfig = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err instanceof AxiosError) {
      if (err.status === 401) {
        return (window.location.href = "/auth/signin");
      }
    }
  }
);
