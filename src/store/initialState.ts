import type { Filter, MetaResponse, Todo, TodoInfo } from "../types/todo";
import type { Profile } from "../types/user";
import { initAsyncParticle } from "./utils";

export const initialStateUser = {
  profileRequest: initAsyncParticle<Profile>(),
  loginRequest: initAsyncParticle<void>(),
  registerRequest: initAsyncParticle<void>(),
  logOutRequest: initAsyncParticle<void>(),
  isAuth: initAsyncParticle<boolean>(),
};

export const initialStateTodo = {
  todos: initAsyncParticle<MetaResponse<Todo, TodoInfo>>(),
  createTaskRequest: initAsyncParticle<Todo>(),
  updateTaskStateRequest: initAsyncParticle<void>(),
  deleteTaskRequest: initAsyncParticle<void>(),
  filter: initAsyncParticle<Filter>(),
};
