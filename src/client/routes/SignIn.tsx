import Navigation from "../views/Navigation";
import useTitle from "../hooks/useTitle";
import AppFormWrapper from "../views/AppFormWrapper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import { Link as Router, useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";

import { useLoginUserMutation } from "../api/authApiSlice";
import { useAppDispatch } from "../hooks/reduxHooks";
import {
  resetSuccess,
  setError,
  setSuccess,
  resetError,
} from "../app/UI/uiSlice";
import { logIn } from "../app/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Box from "@mui/material/Box";
import { isErrorWithMsg } from "../utils/rtkErrorHandling";
import GoogleIcon from "@mui/icons-material/Google";

const formSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/.*[0-9]{2,}.*$/, {
        message: "Password must include at least 2 numbers",
      }),
  })
  .required();

type FormData = z.infer<typeof formSchema>;

const SignIn = () => {
  useTitle("Sign In | CROWN");
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Handle the form submission logic here (e.g., send data to a server)
    try {
      const response = await loginUser(data).unwrap();
      dispatch(setSuccess(response?.msg));
      setTimeout(() => dispatch(resetSuccess(undefined)), 5000);
      navigate(location.state?.from || "/", { replace: true });
      dispatch(logIn(response));
    } catch (error) {
      if (isErrorWithMsg(error)) {
        dispatch(setError(error.data.msg));
        setTimeout(() => dispatch(resetError(undefined)), 5000);
      }
    }
  };

  const signInGoogle = async () => {
    window.location.href = "http://localhost:3000/api/v1/auth/google";
  };

  return (
    <>
      <Navigation />
      <AppFormWrapper>
        <Typography variant="h3" gutterBottom align="center">
          Sign In
        </Typography>
        <Divider variant="middle" />
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          {"Not a member yet?"}{" "}
          <Link component={Router} to={"/signUp"}>
            Sign up here
          </Link>
        </Typography>
        <Box
          component={"form"}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, display: "flex", flexDirection: "column" }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                margin="normal"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                color="primary"
                focused
                required
                onBlur={() => clearErrors("email")}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                margin="normal"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                color="primary"
                focused
                required
                onBlur={() => clearErrors("password")}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Typography align="justify" sx={{ pt: 2 }}>
            <Link component={Router} to={"/forgotPassword"}>
              Forgot password?
            </Link>
          </Typography>
          <Typography align="justify" sx={{ pt: 2 }}>
            <Link component={Router} to={"/verifyEmail"}>
              Verify email
            </Link>
          </Typography>
          <Divider light sx={{ mt: 3 }}>
            OR
          </Divider>
          <Button
            startIcon={<GoogleIcon />}
            sx={{ mt: 3 }}
            color="secondary"
            onClick={signInGoogle}
          >
            Sign in with Google
          </Button>
        </Box>
      </AppFormWrapper>
    </>
  );
};

export default SignIn;
