import { createDraftSafeSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { getAsyncRequestData, type IAsyncParticle } from "../utils";
import type { User, MetaResponse as MetaResponseUser } from "../../types/admin";

export interface AdminState {
  usersRequest: IAsyncParticle<MetaResponseUser<User>>;
  userRequest: IAsyncParticle<User>;
  updateUserRightsRequest: IAsyncParticle<User>;
  updateUserDataRequest: IAsyncParticle<User>;
  blockUserRequest: IAsyncParticle<User>;
  unblockUserRequest: IAsyncParticle<User>;
  deleteUserRequest: IAsyncParticle<void>;
}

export const selectAdminStore = (state: RootState): AdminState => state.admin;

export const selectUserRequest = createDraftSafeSelector(
  selectAdminStore,
  (state) => getAsyncRequestData(state.userRequest)
);

export const selectUsersRequest = createDraftSafeSelector(
  selectAdminStore,
  (state) => getAsyncRequestData(state.usersRequest)
);

export const selectUpdateUserDataRequest = createDraftSafeSelector(
  selectAdminStore,
  (state) => getAsyncRequestData(state.updateUserDataRequest)
);

export const selectUpdateUserRightsRequest = createDraftSafeSelector(
  selectAdminStore,
  (state) => getAsyncRequestData(state.updateUserRightsRequest)
);

export const selectBlockUserRequest = createDraftSafeSelector(
  selectAdminStore,
  (state) => getAsyncRequestData(state.blockUserRequest)
);

export const selectUnblockUserRequest = createDraftSafeSelector(
  selectAdminStore,
  (state) => getAsyncRequestData(state.unblockUserRequest)
);

export const selectDeleteUserRequest = createDraftSafeSelector(
  selectAdminStore,
  (state) => getAsyncRequestData(state.deleteUserRequest)
);

/* export const selectProfileUserStatus = createDraftSafeSelector(
  selectAuthStore,
  (state) => getAsyncDataStatus(state.profileRequest)
); */
