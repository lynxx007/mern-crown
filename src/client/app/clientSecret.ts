import { Slice, createSlice } from "@reduxjs/toolkit";

interface ClientSecret {
  clientSecret: string;
}

const initialState: ClientSecret = {
  clientSecret: "",
};

const clientSecretSlice: Slice<ClientSecret> = createSlice({
  name: "clientSecret",
  initialState,
  reducers: {
    setClientSecret: (state, action) => {
      state.clientSecret = action.payload;
    },
  },
});

export const { setClientSecret } = clientSecretSlice.actions;
export default clientSecretSlice.reducer;
