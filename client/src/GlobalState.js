import React, { createContext } from "react";
import UserAPI from "./api/UserAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {

  const state = {
    userAPI: UserAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
