import { Slice, createSlice } from "@reduxjs/toolkit";
import type { AlertColor } from "@mui/material";

interface UIState {
  success: boolean;
  msg: string;
  status: AlertColor;
}

const initialState: UIState = {
  success: false,
  msg: "",
  status: "info",
};

const uiSlice: Slice<UIState> = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.success = true;
      state.msg = action.payload;
      state.status = "success";
    },
    setError: (state, action) => {
      state.success = true;
      state.msg = action.payload;
      state.status = "error";
    },
    resetSuccess: (state) => {
      state.success = false;
      state.msg = "";
      state.status = "info";
    },
    resetError: (state) => {
      state.success = false;
      state.msg = "";
      state.status = "info";
    },
  },
});

export const { setSuccess, setError, resetSuccess, resetError } =
  uiSlice.actions;
export default uiSlice.reducer;
