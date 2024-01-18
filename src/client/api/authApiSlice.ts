import { apiSlice } from "./apiSlice";
interface FormData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
}
export interface ResponseLogin {
  user: {
    firstName: string;
    lastName: string;
    username: string;
    imageUrl?: string;
    address?: string;
    email: string;
    roles: Array<string>;
    city?: string;
    _id: string;
  };
  msg: string;
  success: boolean;
  accessToken: string;
}

interface ResponseRegister {
  success: boolean;
  msg: string;
}
interface ResponseResendVerifyEmail {
  success: boolean;
  msg: string;
}

interface FormDataLogin {
  email: string;
  password: string;
}

interface ResponseLogout {
  success: boolean;
  msg: string;
}

interface ResponseForgotPassword {
  success: boolean;
  msg: string;
}

interface ResponseResetPassword {
  success: boolean;
  msg: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<ResponseRegister, FormData>({
      query: (data) => ({ url: "/auth/register", method: "POST", body: data }),
    }),
    resendVerifyEmail: builder.mutation<
      ResponseResendVerifyEmail,
      { email: string }
    >({
      query: (data) => ({
        url: "/auth/resend-verify-email",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation<ResponseLogin, FormDataLogin>({
      query: (data) => ({ url: "/auth/login", method: "POST", body: data }),
    }),
    logoutUser: builder.mutation<ResponseLogout, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation<ResponseForgotPassword, { email: string }>(
      {
        query: (data) => ({
          url: "/auth/forgot-password-request",
          method: "POST",
          body: data,
        }),
      }
    ),
    resetPassword: builder.mutation<
      ResponseResetPassword,
      { password: string; passwordConfirm: string; userId: string }
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useResendVerifyEmailMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;
