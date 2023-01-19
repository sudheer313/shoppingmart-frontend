import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://shoppingmart-backend.onrender.com:5000/api",
});
