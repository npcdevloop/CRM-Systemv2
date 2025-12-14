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
  loadUserProfile,
  loadUsers,
  loadUser,
  updateUserRights,
  updateUserData,
  blockUser,
  unblockUser,
  deleteUser,
} from "../api/api";
import type {
  Filter,
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from "../types/todo";
import type {
  User,
  MetaResponse as MetaResponseUser,
  UserFilters,
  UserRolesRequest,
  UserRequest,
} from "../types/admin";
import type { AuthData, Profile, Token, UserRegistration } from "../types/user";
import { replaceOneDataField } from "./admin/Slices/slice";
import { logOut } from "./auth/Slices/slice";
import { replaceTodosData } from "./todo/Slices/slice";

interface TodoUpdateParams extends TodoRequest {
  id: number;
}

interface UpdateUserRightsParams extends UserRolesRequest {
  id: number;
}

interface UpdateUserDataAdminParams extends UserRequest {
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
      const message = e instanceof Error ? e.message : String(e);
      return rejectWithValue({
        errorMessage: message || "Произошла ошибка при загрузке задач!",
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
        const message = e instanceof Error ? e.message : String(e);
        return rejectWithValue({
          errorMessage: message || "Произошла ошибка при создании задачи!",
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
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        return rejectWithValue({
          errorMessage: message || "Произошла ошибка при обновлении задачи!",
        });
      }
    }
  );

export const deleteTodosTask: TSliceMethod<void, TodoUpdateParams> =
  createAsyncThunk<void, TodoUpdateParams, { rejectValue: IErrorData }>(
    "todos/deleteTodosTask",
    async (params, { rejectWithValue, dispatch }) => {
      const { id } = params;
      try {
        await deleteTask(id);
        dispatch(replaceTodosData(id));
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        return rejectWithValue({
          errorMessage: message || "Произошла ошибка при удалении задачи!",
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
        const message = e instanceof Error ? e.message : String(e);
        return rejectWithValue({
          errorMessage: message || "Произошла ошибка при регистрации!",
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
        const message = e instanceof Error ? e.message : String(e);
        return rejectWithValue({
          errorMessage: message || "Произошла ошибка при загрузке профиля!",
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

  async (_, { rejectWithValue, dispatch }) => {
    try {
      await logoutUser();
      dispatch(logOut());
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return rejectWithValue({
        errorMessage: message || "Произошла ошибка при выходе из системы!",
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
      const message = e instanceof Error ? e.message : String(e);
      return rejectWithValue({
        errorMessage: message || "Произошла ошибка при авторизации!",
      });
    }
  }
);

// -------------------------------------------------------------------------- //
export const fetchUsers: TSliceMethod<
  MetaResponseUser<User>,
  UserFilters
> = createAsyncThunk<
  MetaResponseUser<User>,
  UserFilters,
  { rejectValue: IErrorData }
>(
  "admin/fetchUsers",

  async (params, { rejectWithValue }) => {
    try {
      const { search, sortBy, sortOrder, isBlocked, limit, page } = params;
      const response = await loadUsers({
        search,
        sortBy,
        sortOrder,
        isBlocked,
        limit,
        page,
      });
      return response;
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return rejectWithValue({
        errorMessage: message || "Произошла ошибка при загрузке пользователей!",
      });
    }
  }
);

export const fetchUser: TSliceMethod<User, number> = createAsyncThunk<
  User,
  number,
  { rejectValue: IErrorData }
>(
  "admin/fetchUser",

  async (id, { rejectWithValue }) => {
    try {
      const response = await loadUser(id);
      return response;
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return rejectWithValue({
        errorMessage: message || "Произошла ошибка при загрузке пользователя!",
      });
    }
  }
);

export const updateUserRightsAdmin: TSliceMethod<void, UpdateUserRightsParams> =
  createAsyncThunk<void, UpdateUserRightsParams, { rejectValue: IErrorData }>(
    "admin/updateUserRightsAdmin",

    async (params, { rejectWithValue, dispatch }) => {
      try {
        const { id, roles } = params;
        const newUserRights = await updateUserRights(id, { roles });
        dispatch(replaceOneDataField(newUserRights));
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        return rejectWithValue({
          errorMessage:
            message || "Произошла ошибка при обновлении прав пользователя!",
        });
      }
    }
  );

export const updateUserDataAdmin: TSliceMethod<
  void,
  UpdateUserDataAdminParams
> = createAsyncThunk<
  void,
  UpdateUserDataAdminParams,
  { rejectValue: IErrorData }
>(
  "admin/updateUserDataAdmin",

  async (params, { rejectWithValue, dispatch }) => {
    try {
      const { id, username, email, phoneNumber } = params;
      const user = await updateUserData(id, {
        username,
        email,
        phoneNumber,
      });
      dispatch(replaceOneDataField(user));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return rejectWithValue({
        errorMessage:
          message || "Произошла ошибка при обновление данных пользователя!",
      });
    }
  }
);

export const blockUserAdmin: TSliceMethod<User, number> = createAsyncThunk<
  User,
  number,
  { rejectValue: IErrorData }
>("admin/blockUserAdmin", async (id, { rejectWithValue }) => {
  try {
    const response = await blockUser(id);
    return response;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return rejectWithValue({
      errorMessage: message || "Произошла ошибка при блокировке пользователя!",
    });
  }
});

export const unblockUserAdmin: TSliceMethod<User, number> = createAsyncThunk<
  User,
  number,
  { rejectValue: IErrorData }
>(
  "admin/unblockUserAdmin",

  async (id, { rejectWithValue }) => {
    try {
      const response = await unblockUser(id);
      return response;
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return rejectWithValue({
        errorMessage:
          message || "Произошла ошибка при разблокировке пользователя!",
      });
    }
  }
);

export const deleteUserAdmin: TSliceMethod<void, number> = createAsyncThunk<
  void,
  number,
  { rejectValue: IErrorData }
>(
  "admin/deleteUserAdmin",

  async (id, { rejectWithValue }) => {
    try {
      await deleteUser(id);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return rejectWithValue({
        errorMessage: message || "Произошла ошибка при удалении пользователя!",
      });
    }
  }
);
