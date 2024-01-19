import { createSlice, Slice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ResponseLogin } from "../../api/authApiSlice";
import { resProfile } from "../../api/userApiSlice";
import { decodeToken } from "react-jwt";

export interface UserState {
  user:
    | {
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        imageUrl?: string;
        address?: string;
        roles: Array<string>;
        city?: string;
        _id: string;
      }
    | undefined;
  accessToken: string | undefined;
}

const googleToken = localStorage.getItem("googleToken");

const initialState: UserState = {
  user: googleToken
    ? (decodeToken(googleToken) as {
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        imageUrl?: string;
        _id: string;
        roles: Array<string>;
      })
    : undefined,
  accessToken: googleToken ? googleToken : undefined,
};

const authSlice: Slice<UserState> = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<ResponseLogin>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logOut: (state) => {
      state.user = undefined;
      state.accessToken = undefined;
    },
    update: (state, action: PayloadAction<resProfile>) => {
      state.user = action.payload.user;
    },
    deleteImage: (state) => {
      if (state.user?.imageUrl) {
        state.user.imageUrl = undefined;
      }
    },
    getUser: (state, action: PayloadAction<resProfile>) => {
      state.user = action.payload.user;
    },
  },
});

export const { logIn, logOut, deleteImage, update, getUser } =
  authSlice.actions;

export default authSlice.reducer;
