import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TSliceMethod, IErrorData } from "./utils";
import {
  loadTasksByFilter,
  createTask,
  updateTaskState,
  deleteTask,
  registrationUser,
  authUser,
  logoutUser,
  refreshAccessToken,
  loadUserProfile,
} from "../api/api";
import type {
  Filter,
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from "../types/interface";
import type {
  AuthData,
  Profile,
  RefreshToken,
  Token,
  UserRegistration,
} from "../types/interface_user";

interface TodoUpdateParams extends TodoRequest {
  id: number;
}

interface CreateTaskTitle {
  title: string;
}

export const fetchTodosByFilter: TSliceMethod<
  MetaResponse<Todo, TodoInfo>,
  Filter
> = createAsyncThunk<
  MetaResponse<Todo, TodoInfo>, // 1.  Тип успешного ответа
  Filter, // 2. Тип аргументов
  { rejectValue: IErrorData } // 3. Указываем тип ошибки для rejectWithValue
>(
  "todos/fetchTodosByFilter", // 4. Название действия (любая уникальная строка)

  async (filter, { rejectWithValue }) => {
    try {
      const response = await loadTasksByFilter(filter);
      return response;
    } catch (e) {
      return rejectWithValue({
        errorMessage: e.message || "Произошла ошибка при загрузке задач!",
      });
    }
  }
);

export const createTodosTask: TSliceMethod<Todo, CreateTaskTitle> =
  createAsyncThunk<Todo, CreateTaskTitle, { rejectValue: IErrorData }>(
    "todos/createTodosTask",
    async ({ title }, { rejectWithValue }) => {
      try {
        const response = await createTask(title);
        return response;
      } catch (e) {
        return rejectWithValue({
          errorMessage: e.message || "Произошла ошибка при создании задачи!",
        });
      }
    }
  );

export const updateTodosTaskState: TSliceMethod<void, TodoUpdateParams> =
  createAsyncThunk<void, TodoUpdateParams, { rejectValue: IErrorData }>(
    "todos/updateTodosTaskState",
    async (params, { rejectWithValue }) => {
      const { id, title, isDone } = params;
      try {
        await updateTaskState(id, { title, isDone });
        return;
      } catch (e) {
        return rejectWithValue({
          errorMessage: e.message || "Произошла ошибка при обновлении задачи!",
        });
      }
    }
  );

export const deleteTodosTask: TSliceMethod<void, TodoUpdateParams> =
  createAsyncThunk<void, TodoUpdateParams, { rejectValue: IErrorData }>(
    "todos/deleteTodosTask",
    async (params, { rejectWithValue }) => {
      const { id } = params;
      try {
        await deleteTask(id);
        return;
      } catch (e) {
        return rejectWithValue({
          errorMessage: e.message || "Произошла ошибка при удалении задачи!",
        });
      }
    }
  );

export const registrationUserAuth: TSliceMethod<void, UserRegistration> =
  createAsyncThunk<void, UserRegistration, { rejectValue: IErrorData }>(
    "auth/registrationUserAuth",

    async (params, { rejectWithValue }) => {
      try {
        const { email, login, password, phoneNumber, username } = params;
        const response = await registrationUser(
          email,
          login,
          password,
          phoneNumber,
          username
        );
        return response;
      } catch (e) {
        return rejectWithValue({
          errorMessage: e.message || "Произошла ошибка при регистрации!",
        });
      }
    }
  );

export const loadProfileUserAuth: TSliceMethod<Profile, void> =
  createAsyncThunk<Profile, void, { rejectValue: IErrorData }>(
    "auth/loadProfileUserAuth",
    async (_, { rejectWithValue }) => {
      try {
        const response = await loadUserProfile();
        return response;
      } catch (e) {
        return rejectWithValue({
          errorMessage: e.message || "Произошла ошибка при загрузке профиля!",
        });
      }
    }
  );

export const logoutUserAuth: TSliceMethod<void, void> = createAsyncThunk<
  void,
  void,
  { rejectValue: IErrorData }
>(
  "auth/logoutUserAuth",

  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();
      return;
    } catch (e) {
      return rejectWithValue({
        errorMessage: e.message || "Произошла ошибка при выходе из системы!",
      });
    }
  }
);

export const loginUserAuth: TSliceMethod<Token, AuthData> = createAsyncThunk<
  Token,
  AuthData,
  { rejectValue: IErrorData }
>(
  "auth/loginUserAuth",

  async (params, { rejectWithValue }) => {
    try {
      const { login, password } = params;
      const response = await authUser(login, password);
      return response;
    } catch (e) {
      return rejectWithValue({
        errorMessage: e.message || "Произошла ошибка при авторизации!",
      });
    }
  }
);

export const refreshTokenAuth: TSliceMethod<Token, RefreshToken> =
  createAsyncThunk<Token, RefreshToken, { rejectValue: IErrorData }>(
    "auth/refreshTokenAuth",

    async (params, { rejectWithValue }) => {
      try {
        const { refreshToken } = params;
        const response = await refreshAccessToken(refreshToken);
        return response;
      } catch (e) {
        return rejectWithValue({
          errorMessage:
            e.message || "Произошла ошибка при обновлении ключей доступа!",
        });
      }
    }
  );
