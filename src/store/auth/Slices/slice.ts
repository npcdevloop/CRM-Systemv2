import { createSlice } from "@reduxjs/toolkit";
import { initialStateUser } from "../../initialState";
import { addAsyncBuilderCases, resetAllFieldState } from "../../utils";
import {
  loadProfileUserAuth,
  loginUserAuth,
  logoutUserAuth,
  registrationUserAuth,
} from "../../apiThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateUser,
  reducers: {
    setAuth: (state, action) => {
      const isAuth = action.payload;
      state.isAuth.data = isAuth;
    },
    logOut: (state) => {
      state.isAuth.data = false;
      resetAllFieldState(state, "profileRequest");
      resetAllFieldState(state, "loginRequest");
      resetAllFieldState(state, "registerRequest");
      resetAllFieldState(state, "logOutRequest");
    },
  },
  extraReducers: (builder) => {
    addAsyncBuilderCases(builder, loginUserAuth, "loginRequest");
    addAsyncBuilderCases(builder, registrationUserAuth, "registerRequest");
    addAsyncBuilderCases(builder, loadProfileUserAuth, "profileRequest");
    addAsyncBuilderCases(builder, logoutUserAuth, "logOutRequest");
  },
});

export const { setAuth, logOut } = authSlice.actions;
export default authSlice.reducer;
