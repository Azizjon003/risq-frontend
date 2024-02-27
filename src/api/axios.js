import axios from "axios";
import { getSessionCookies } from "../hooks/useCookies.js";

export default axios.create({
  baseURL: "https://risq-backend.fly.dev/",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${getSessionCookies("accessToken")}`,
  },
});
