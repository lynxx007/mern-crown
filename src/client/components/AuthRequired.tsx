import { Navigate, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import * as React from "react";

const AuthRequired = ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: JSX.Element;
}) => {
  const location = useLocation();
  const { roles } = useAuthUser();

  const isRoleAllowed = roles.some((role) => allowedRoles.includes(role));

  if (!isRoleAllowed) {
    return (
      <Navigate
        to={{ pathname: "/signIn" }}
        state={{ from: location }}
        replace
      />
    );
  }
  return children;
};

export default AuthRequired;
