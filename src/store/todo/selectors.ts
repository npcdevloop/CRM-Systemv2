import { createDraftSafeSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";
import {
  getAsyncDataStatus,
  getAsyncRequestData,
  type IAsyncParticle,
} from "../utils";
import type { Filter, MetaResponse, Todo, TodoInfo } from "../../types/todo";

export interface TodoState {
  todos: IAsyncParticle<MetaResponse<Todo, TodoInfo>>;
  createTaskRequest: IAsyncParticle<Todo>;
  updateTaskStateRequest: IAsyncParticle<void>;
  deleteTaskRequest: IAsyncParticle<void>;
  filter: IAsyncParticle<Filter>;
}

export const selectTodoStore = (state: RootState): TodoState => state.todo;

export const selectTab = createDraftSafeSelector(
  selectTodoStore,
  (state) => state.filter
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
