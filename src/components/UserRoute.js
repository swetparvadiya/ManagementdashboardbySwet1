import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
