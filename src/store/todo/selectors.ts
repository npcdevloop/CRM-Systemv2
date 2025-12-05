import { createDraftSafeSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";
import {
  getAsyncDataStatus,
  getAsyncRequestData,
  type IAsyncParticle,
} from "../utils";
import type {
  Filter,
  MetaResponse,
  Todo,
  TodoInfo,
} from "../../types/interface";

/*
https://redux-toolkit.js.org/api/createSelector   --- > createDraftSafeSelector

*/

export interface TodoState {
  todos: IAsyncParticle<MetaResponse<Todo, TodoInfo>>;
  createTaskRequest: IAsyncParticle<Todo>;
  updateTaskStateRequest: IAsyncParticle<void>;
  deleteTaskRequest: IAsyncParticle<void>;
  tab: Filter;
}

export const selectTodoStore = (state: RootState): TodoState => state.todo;

export const selectTab = createDraftSafeSelector(
  selectTodoStore,
  (state) => state.tab
);

export const selectTodosFull = createDraftSafeSelector(
  selectTodoStore,
  (state) => getAsyncRequestData(state.todos)
);

export const selectCreateTaskFull = createDraftSafeSelector(
  selectTodoStore,
  (state) => getAsyncRequestData(state.createTaskRequest)
);

export const selectUpdateTaskStateRequestStatus = createDraftSafeSelector(
  selectTodoStore,
  (state) => getAsyncDataStatus(state.updateTaskStateRequest)
);

export const selectDeleteTaskRequestStatus = createDraftSafeSelector(
  selectTodoStore,
  (state) => getAsyncDataStatus(state.deleteTaskRequest)
);
