import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const axiosConfig = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});
