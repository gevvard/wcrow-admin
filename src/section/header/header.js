import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import Menu from "../../pages/menu";
import Logo from "../../pages/logo";

import css from "./header.module.scss";

const Header = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state?.signIn);
  const isAuthenticated = user?.accessToken || localStorage.getItem("token");
  const logOut = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className={css.header}>
      <Logo />
      <Menu isAuthenticated={isAuthenticated} />
      {isAuthenticated ? (
        <Button variant="contained" endIcon={<LogoutIcon />} onClick={logOut}>
          Log out
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
