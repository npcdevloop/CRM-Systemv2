import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      const accessToken = action.payload;
      state.token = accessToken;
    },
    setUser: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setToken, setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
