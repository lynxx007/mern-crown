import Navigation from "../views/Navigation";
import Footer from "../views/Footer";
import AppForm from "../views/AppFormWrapper";
import useTitle from "../hooks/useTitle";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import { Link as Router } from "react-router-dom";
import * as z from "zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useResendVerifyEmailMutation } from "../api/authApiSlice";
import { useAppDispatch } from "../hooks/reduxHooks";
import {
  resetError,
  resetSuccess,
  setError,
  setSuccess,
} from "../app/UI/uiSlice";
import * as React from "react";
import { isErrorWithMsg } from "../utils/rtkErrorHandling";
const formSchema = z.object({
  email: z.string().email("Invalid email"),
});

type FormData = z.infer<typeof formSchema>;

const VerifyEmail = () => {
  useTitle("Verify Email | CROWN");
  const [resendVerifyEmail, { isLoading }] = useResendVerifyEmailMutation();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await resendVerifyEmail(data).unwrap();

      dispatch(setSuccess(response.msg));
      setTimeout(() => dispatch(resetSuccess(undefined)), 5000);
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
        <Typography variant="h3" gutterBottom align="center">
          Verify Email
        </Typography>
        <Divider variant="middle" />
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          {"Not a member yet?"}{" "}
          <Link component={Router} to={"/signUp"}>
            Sign up here
          </Link>
        </Typography>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                error={Boolean(errors.email)}
                variant="outlined"
                helperText={errors.email?.message}
                fullWidth
                onBlur={() => clearErrors("email")}
                sx={{ mt: 2, mb: 1 }}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            disabled={isLoading}
          >
            Send Verify Email
          </Button>
        </form>
      </AppForm>
      <Footer />
    </>
  );
};
export default VerifyEmail;
