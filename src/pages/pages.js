import React, { useEffect } from "react";
import { authRoutes, routes } from "./route";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Pages = () => {
  const navigateTo = useNavigate();
  const { user } = useSelector((state) => state?.signIn);
  const isAuthenticated = user?.accessToken || localStorage.getItem("token");
  console.log("isAuthenticated",isAuthenticated)
  useEffect(() => {
    if (isAuthenticated) {
      navigateTo(authRoutes[0]?.path);
    } else {
      navigateTo(routes[0]?.path);
    }
  }, [isAuthenticated]);

  return (
    <Routes>
      {isAuthenticated
        ? authRoutes.map(({ path, element }) => {
            return (
              <Route key={path} path={path} element={element} exact="true" />
            );
          })
        : routes.map(({ path, element }) => {
            return (
              <Route key={path} path={path} element={element} exact="true" />
            );
          })}
      {/*<Route path={'*'} element={<Navigate to={isAuthenticated ? HOME_PAGE : SIGN_IN}/>} exact='true'/>*/}
    </Routes>
  );
};

export default Pages;
