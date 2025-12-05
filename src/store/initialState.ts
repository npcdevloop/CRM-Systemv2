import type { Filter, MetaResponse, Todo, TodoInfo } from "../types/interface";
import type { Profile, Token } from "../types/interface_user";
import { initAsyncParticle } from "./utils";

export const initialStateUser = {
  profileRequest: initAsyncParticle<Profile>(),
  loginRequest: initAsyncParticle<void>(),
  registerRequest: initAsyncParticle<void>(),
  logOutRequest: initAsyncParticle<void>(),
  refreshTokenAuthRequest: initAsyncParticle<Token>(),
  isAuth: false,
};

export const initialStateTodo = {
  todos: initAsyncParticle<MetaResponse<Todo, TodoInfo>>(),
  createTaskRequest: initAsyncParticle<Todo>(),
  updateTaskStateRequest: initAsyncParticle<void>(),
  deleteTaskRequest: initAsyncParticle<void>(),
  tab: "all" as Filter,
};
