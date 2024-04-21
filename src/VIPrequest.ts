import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const VIPrequest = axios.create({
  baseURL: "https://vip.ventraip.com.au/api",
  headers: {
    Cookie: process.env.VIP_CONTROL_REQUEST_COOKIE,
    Referer: "https://vip.ventraip.com.au/dashboard",
  },
  withCredentials: true,
});
