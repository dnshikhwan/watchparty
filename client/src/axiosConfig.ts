import axios from "axios";

const baseURL = import.meta.env.BASE_URL;

export const axiosConfig = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});
