import { createDraftSafeSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";
import {
  getAsyncDataStatus,
  getAsyncRequestData,
  type IAsyncParticle,
} from "../utils";
import type { Profile } from "../../types/interface_user";

export interface UserState {
  profileRequest: IAsyncParticle<Profile>;
  loginRequest: IAsyncParticle<void>;
  registerRequest: IAsyncParticle<void>;
  logOutRequest: IAsyncParticle<void>;
  isAuth: IAsyncParticle<boolean>;
}

export const selectAuthStore = (state: RootState): UserState => state.auth;

export const selectIsAuth = createDraftSafeSelector(
  selectAuthStore,
  (state) => state.isAuth
);

export const selectProfileUserStatus = createDraftSafeSelector(
  selectAuthStore,
  (state) => getAsyncDataStatus(state.profileRequest)
);

export const selectProfileUser = createDraftSafeSelector(
  selectAuthStore,
  (state) => getAsyncRequestData(state.profileRequest)
);

export const selectLoginRequestStatus = createDraftSafeSelector(
  selectAuthStore,
  (state) => getAsyncDataStatus(state.loginRequest)
);

export const selectRegisterRequestStatus = createDraftSafeSelector(
  selectAuthStore,
  (state) => getAsyncDataStatus(state.registerRequest)
);

export const selectLogOutRequest = createDraftSafeSelector(
  selectAuthStore,
  (state) => getAsyncDataStatus(state.logOutRequest)
);
