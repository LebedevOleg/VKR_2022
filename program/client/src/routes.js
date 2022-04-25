import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import ShopPage from "./pages/shopPage/shopPage";

export const useRoutes = () => {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/shop" component={ShopPage} />
    </Routes>
  );
};
