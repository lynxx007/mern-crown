import { createSlice, Slice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ResponseLogin } from "../../api/authApiSlice";
import { resProfile } from "../../api/userApiSlice";
import { decodeToken } from "react-jwt";
export interface UserState {
  user:
    | {
        _id: string;
        firstName: string;
        lastName: string;
        username: string;
        imageUrl?: string;
        address?: string;
        email: string;
        roles: Array<string>;
        city?: string;
      }
    | undefined;
  accessToken: string | undefined;
}

// const googleToken = localStorage.getItem("googleToken");

const initialState: UserState = {
  user: undefined,
  accessToken: undefined,
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
    getGoogleUser: (state, action: PayloadAction<string>) => {
      const token = decodeToken(action.payload) as {
        roles: string[];
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        imageUrl: string;
        _id: string;
      };
      console.log(token);
      state.user = token;
      state.accessToken = action.payload;
    },
  },
});

export const { logIn, logOut, deleteImage, update, getUser, getGoogleUser } =
  authSlice.actions;

export default authSlice.reducer;
