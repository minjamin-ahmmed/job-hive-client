import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={location?.pathname}></Navigate>;
};

export default PrivateRoute;
