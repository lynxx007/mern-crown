import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import { useAppDispatch } from "../hooks/reduxHooks";
import { getGoogleUser } from "../app/auth/authSlice";
const GoogleRedirectHandler = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  useEffect(() => {
    console.log(token);

    if (token) {
      dispatch(getGoogleUser(token));
    }

    navigate("/", { replace: true });
  }, [navigate, dispatch, token]);

  return <div>Redirecting...</div>;
};

export default GoogleRedirectHandler;
