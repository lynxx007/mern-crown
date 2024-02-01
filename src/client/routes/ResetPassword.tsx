import useTitle from "../hooks/useTitle";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Navigation from "../views/Navigation";

import AppForm from "../views/AppFormWrapper";
import { useAppDispatch } from "../hooks/reduxHooks";
import {
  resetError,
  resetSuccess,
  setError,
  setSuccess,
} from "../app/UI/uiSlice";
import { useResetPasswordMutation } from "../api/authApiSlice";
import * as React from "react";
import { isErrorWithMsg } from "../utils/rtkErrorHandling";

const formSchema = z
  .object({
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

    userId: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof formSchema>;

const ResetPassword = () => {
  useTitle("Reset Password | CROWN");
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      password: "",
      passwordConfirm: "",
      userId: userId || "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Handle the form submission logic here (e.g., send data to a server)
    try {
      const response = await resetPassword(data).unwrap();

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
      <AppForm>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Reset Password
        </Typography>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Controller
            name="passwordConfirm"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Confirm Password"
                type="password"
                margin="normal"
                error={!!errors.passwordConfirm}
                helperText={errors.passwordConfirm?.message}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            Reset Password
          </Button>
        </form>
      </AppForm>
    </>
  );
};

export default ResetPassword;
