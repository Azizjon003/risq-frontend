import Cookies from "js-cookie";

export const setCookies = (prop, value) => {
  return Cookies.set(prop, value, {
    expires: 5,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};

export const setSessionCookies = (prop, value) => {
  return localStorage.setItem(prop, value);
};
export const getCookies = (prop) => {
  return Cookies.get(prop);
};

export const getSessionCookies = (prop) => {
  return localStorage.getItem(prop);
};

export const removeCookies = (prop) => {
  return Cookies.remove(prop);
};
