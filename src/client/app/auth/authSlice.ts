import { createSlice, Slice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../hooks/reduxHooks";

export interface UserState {
  username: string | undefined;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  imageUrl?: string | undefined;
  address?: string | undefined;
  roles: Array<string> | undefined;
  accessToken: string | undefined;
}

const initialState: UserState = {
  username: undefined,
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  imageUrl: undefined,
  address: undefined,
  roles: undefined,
  accessToken: undefined,
};

const authSlice: Slice<UserState> = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.imageUrl = action.payload.imageUrl;
      state.address = action.payload.address;
      state.roles = action.payload.roles;
      state.accessToken = action.payload.accessToken;
    },
    logOut: (state) => {
      state.username = undefined;
      state.email = undefined;
      state.firstName = undefined;
      state.lastName = undefined;
      state.imageUrl = undefined;
      state.address = undefined;
      state.roles = undefined;
      state.accessToken = undefined;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

// export const selectUserAccessToken = useAppSelector(state => state.auth.user?.accessToken)

export default authSlice.reducer;
