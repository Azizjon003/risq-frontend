import axios from "axios";
import { getSessionCookies } from "../hooks/useCookies.js";

export default axios.create({
  baseURL: "http://2577905-ck36075.twc1.net/",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${getSessionCookies("accessToken")}`,
  },
});
