import React from "react";
import Navigation from "../views/Navigation";
import useTitle from "../hooks/useTitle";
import AppFormWrapper from "../views/AppFormWrapper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import { Link as Router, useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useRegisterUserMutation } from "../api/authApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch } from "../hooks/reduxHooks";
import {
  setSuccess,
  setError,
  resetError,
  resetSuccess,
} from "../app/UI/uiSlice";
import Box from "@mui/material/Box";
import { isErrorWithMsg } from "../utils/rtkErrorHandling";
import GoogleIcon from "@mui/icons-material/Google";

const formSchema = z
  .object({
    email: z.string().email("Invalid email"),
    username: z
      .string()
      .min(4)
      .regex(/^[a-zA-Z0-9]{4,}$/) // ^ and $ ensure the username starts and ends with alphanumeric characters
      .refine((username) => {
        const letters = username.match(/[a-zA-Z]+/g);
        const numbers = username.match(/[0-9]+/g);
        return letters && numbers && letters.length >= 4 && numbers.length >= 2;
      }, "Username must contain at least 4 letters and 2 numbers"),
    // Password and confirmation
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .refine(
        (password) => {
          const letters = password.match(/[a-zA-Z]+/g);
          const numbers = password.match(/[0-9]+/g);
          return (
            letters && numbers && letters.length >= 4 && numbers.length >= 2
          );
        },
        { message: "Password must contain at least 4 letters and 2 numbers" }
      ),
    passwordConfirm: z
      .string()
      .min(6, {
        message: "Password confirmation must be at least 6 characters long",
      })
      .refine((passwordConfirm) => {
        const letters = passwordConfirm.match(/[a-zA-Z]+/g);
        const numbers = passwordConfirm.match(/[0-9]+/g);
        return letters && numbers && letters.length >= 4 && numbers.length >= 2;
      }),

    // First and last name validation
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof formSchema>;
const SignUp = () => {
  useTitle("Sign Up | CROWN");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Handle the form submission logic here (e.g., send data to a server)
    try {
      const response = await registerUser(data).unwrap();

      dispatch(setSuccess(response?.msg));
      setTimeout(() => dispatch(resetSuccess(undefined)), 5000);
      navigate("/waitingForVerifications");
    } catch (error) {
      if (isErrorWithMsg(error)) {
        dispatch(setError(error.data.msg));
        setTimeout(() => dispatch(resetError(undefined)), 5000);
      }
    }
  };

  return (
    <>
      <Navigation />
      <AppFormWrapper>
        <Typography variant="h3" gutterBottom align="center">
          Sign Up
        </Typography>
        <Divider variant="middle" />
        <Typography variant="body2" align="center">
          {"Already a member?"}{" "}
          <Link component={Router} to={"/signIn"}>
            Sign in here
          </Link>
        </Typography>
        <Box
          component={"form"}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, display: "flex", flexDirection: "column" }}
        >
          {/* username */}
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  type="text"
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  error={Boolean(errors.username)}
                  color="primary"
                  focused
                  size="small"
                  required
                  helperText={errors.username?.message}
                  onBlur={() => clearErrors("username")}
                />
              </>
            )}
          />

          {/* first name */}
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  type="text"
                  label="First Name"
                  variant="outlined"
                  margin="normal"
                  error={Boolean(errors.firstName)}
                  color="primary"
                  focused
                  size="small"
                  required
                  onBlur={() => clearErrors("firstName")}
                  helperText={errors.firstName?.message}
                />
              </>
            )}
          />
          {/* last name */}
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="Last Name"
                variant="outlined"
                margin="normal"
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
                color="primary"
                focused
                size="small"
                required
                onBlur={() => clearErrors("lastName")}
              />
            )}
          />

          {/* email */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                margin="normal"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                color="primary"
                focused
                size="small"
                required
                onBlur={() => clearErrors("email")}
              />
            )}
          />

          {/* password */}
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
                size="small"
                required
                onBlur={() => clearErrors("password")}
              />
            )}
          />
          {/* password confirm */}
          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Confirm Password"
                margin="normal"
                error={Boolean(errors.passwordConfirm)}
                helperText={errors.passwordConfirm?.message}
                color="primary"
                focused
                size="small"
                required
                onBlur={() => clearErrors("passwordConfirm")}
              />
            )}
          />

          {/* submit button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            disabled={isLoading}
          >
            Sign Up
          </Button>
          <Typography align="justify" sx={{ pt: 2 }}>
            <Link component={Router} to={"/forgotPassword"}>
              Forgot password?
            </Link>
          </Typography>
          <Divider light sx={{ mt: 3 }}>
            OR
          </Divider>
          <Button
            startIcon={<GoogleIcon />}
            sx={{ mt: 0 }}
            color="secondary"
            onClick={() =>
              window.open("http://localhost:3000/api/v1/auth/google", "_self")
            }
          >
            Sign in with Google
          </Button>
        </Box>
      </AppFormWrapper>
    </>
  );
};
export default SignUp;
