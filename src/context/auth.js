import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import config from "../NewConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    wishlist: [],
    user: null,
    token: "",
  });

  useEffect(() => {
    let fromLS = localStorage.getItem("auth");
    if (fromLS) setAuth(JSON.parse(fromLS));
  }, []);

  // configure axios
  // Set the authorization header for all requests
  axios.defaults.baseURL = config.API;
  axios.defaults.headers.Authorization = `Bearer ${auth?.token}`;
  // axios.defaults.headers.common["Authorization"] = `Bearer ${auth?.token}`;
  axios.defaults.headers.common["clave-de-proteccion"] = config.APIS_PROTECT;
  axios.defaults.headers.common["ApiKey"] = config.AUTH_API_KEY;

  axios.defaults.headers.common["Id"] = auth?.user?.email;
  // axios.defaults.headers.common["refresh_token"] = auth?.refreshToken;

  // axios.interceptors.response.use(
  //   (res) => {
  //     return res;
  //   },
  //   async (err) => {
  //     const originalConfig = err.config;

  //     if (err.response) {
  //       // token is expired
  //       if (err.response.status === 401 && !originalConfig._retry) {
  //         originalConfig._retry = true;

  //         try {
  //           const { data } = await axios.get("/refresh-token");
  //           axios.defaults.headers.common["token"] = data.token;
  //           // axios.defaults.headers.common["refresh_token"] = data.refreshToken;

  //           setAuth(data);
  //           localStorage.setItem("auth", JSON.stringify(data));

  //           return axios(originalConfig);
  //         } catch (_error) {
  //           if (_error.response && _error.response.data) {
  //             return Promise.reject(_error.response.data);
  //           }

  //           return Promise.reject(_error);
  //         }
  //       }

  //       if (err.response.status === 403 && err.response.data) {
  //         return Promise.reject(err.response.data);
  //       }
  //     }

  //     return Promise.reject(err);
  //   }
  // );

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
