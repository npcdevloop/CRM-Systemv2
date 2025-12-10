import { createSlice } from "@reduxjs/toolkit";
import { initialStateAdmin } from "../../initialState";
import { addAsyncBuilderCases } from "../../utils";
import {
  blockUserAdmin,
  deleteUserAdmin,
  fetchUser,
  fetchUsers,
  unblockUserAdmin,
  updateUserDataAdmin,
  updateUserRightsAdmin,
} from "../../apiThunk";
import type { User } from "../../../types/interface_admin";

const adminSlice = createSlice({
  name: "admin",
  initialState: initialStateAdmin,
  reducers: {
    replaceUserData(state, action) {
      const userPayload: User = action.payload;
      if (!state.usersRequest.data?.data) {
        return;
      }
      state.usersRequest.data.data = state.usersRequest.data.data.map(
        (user) => {
          if (user.id === userPayload.id) {
            return { ...user, ...userPayload };
          } else {
            return { ...user };
          }
        }
      );
    },
    replaceOneDataFiled(state, action) {
      const userPayload: User = action.payload;
      if (!state.userRequest.data) {
        return;
      }
      state.userRequest.data = userPayload;
    },
    deleteUserData(state, action) {
      const id: number = action.payload;
      if (!state.usersRequest.data?.data) {
        return;
      }
      state.usersRequest.data.data = state.usersRequest.data.data.filter(
        (user) => {
          if (user.id !== id) {
            return { ...user };
          }
        }
      );
    },
  },
  extraReducers: (builder) => {
    addAsyncBuilderCases(builder, fetchUsers, "usersRequest");
    addAsyncBuilderCases(builder, fetchUser, "userRequest");
    addAsyncBuilderCases(
      builder,
      updateUserRightsAdmin,
      "updateUserRightsRequest"
    );
    addAsyncBuilderCases(builder, updateUserDataAdmin, "updateUserDataRequest");
    addAsyncBuilderCases(builder, blockUserAdmin, "blockUserRequest");
    addAsyncBuilderCases(builder, unblockUserAdmin, "unblockUserRequest");
    addAsyncBuilderCases(builder, deleteUserAdmin, "deleteUserRequest");
  },
});

export const { replaceUserData, deleteUserData, replaceOneDataFiled } =
  adminSlice.actions;
export default adminSlice.reducer;
