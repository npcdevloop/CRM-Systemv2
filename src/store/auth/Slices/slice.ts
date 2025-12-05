import { createSlice } from "@reduxjs/toolkit";
import { initialStateUser } from "../../initialState";
import { addAsyncBuilderCases } from "../../utils";
import {
  loadProfileUserAuth,
  loginUserAuth,
  logoutUserAuth,
  refreshTokenAuth,
  registrationUserAuth,
} from "../../apiThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateUser,
  reducers: {
    setAuth: (state, action) => {
      const isAuth = action.payload;
      state.isAuth = isAuth;
    },
    logOut: (state) => {
      state.profileRequest.data = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    addAsyncBuilderCases(builder, loginUserAuth, "loginRequest");
    addAsyncBuilderCases(builder, registrationUserAuth, "registerRequest");
    addAsyncBuilderCases(builder, loadProfileUserAuth, "profileRequest");
    addAsyncBuilderCases(builder, logoutUserAuth, "logOutRequest");
    addAsyncBuilderCases(builder, refreshTokenAuth, "refreshTokenAuthRequest");
  },
});

export const { setAuth, logOut } = authSlice.actions;
export default authSlice.reducer;
