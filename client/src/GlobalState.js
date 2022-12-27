import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import UserAPI from "./api/UserAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("userInfo");
    if (firstLogin) {
      const refreshToken = async () => {
        const { data } = await axios.get("/islogged");

        setToken(data.accesstoken);
      };
      refreshToken();
    }
  }, []);
  const state = {
    userAPI: UserAPI(token),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
