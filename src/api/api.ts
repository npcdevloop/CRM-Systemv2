import type {
  Filter,
  MetaResponse,
  TodoInfo,
  Todo,
  TodoRequest,
} from "../types/todo";
import axios from "axios";
import type { Profile, Token } from "../types/user";
import type {
  User,
  UserFilters,
  MetaResponse as MetaResponseUser,
  UserRolesRequest,
  UserRequest,
} from "../types/admin";

const axiosInstance = axios.create({
  baseURL: "https://easydev.club/api/v1",
});

export function loadTasksByFilter(
  filter: Filter
): Promise<MetaResponse<Todo, TodoInfo>> {
  return axiosInstance
    .get("/todos", {
      params: {
        filter: filter,
      },
    })
    .then((response) => {
      return response.data;
    });
}

export function createTask(title: string): Promise<Todo> {
  return axiosInstance
    .post("/todos", {
      title: title,
      isDone: false,
    })
    .then(({ data }) => {
      return data;
    });
}

export function updateTaskState(
  id: number,
  { title, isDone }: TodoRequest
): void {
  axiosInstance.put(`/todos/${id}`, {
    title,
    isDone,
  });
}

export function deleteTask(id: number): void {
  axiosInstance.delete(`/todos/${id}`);
}

export function registrationUser(
  email: string,
  login: string,
  password: string,
  phoneNumber: string,
  username: string
): void {
  axiosInstance.post("/auth/signup", {
    email,
    login,
    password,
    phoneNumber,
    username,
  });
}

export function authUser(login: string, password: string): Promise<Token> {
  return axiosInstance
    .post("/auth/signin", {
      login,
      password,
    })
    .then(({ data }) => {
      return data;
    });
}

export function logoutUser(): void {
  axiosInstance.post("/user/logout");
}

export function refreshAccessToken(
  refreshToken: string | null
): Promise<Token> {
  return axiosInstance
    .post("/auth/refresh", {
      refreshToken,
    })
    .then(({ data }) => {
      return data;
    });
}

export function loadUserProfile(): Promise<Profile> {
  return axiosInstance.get("/user/profile").then(({ data }) => {
    return data;
  });
}

export function loadUsers({
  search,
  sortBy,
  sortOrder,
  isBlocked,
  limit,
  page,
}: UserFilters): Promise<MetaResponseUser<User>> {
  return axiosInstance
    .get("/admin/users", {
      params: {
        search,
        sortBy,
        sortOrder,
        isBlocked,
        limit,
        page,
      },
    })
    .then(({ data }) => {
      return data;
    });
}

export function loadUser(id: number): Promise<User> {
  return axiosInstance.get(`/admin/users/${id}`).then(({ data }) => {
    return data;
  });
}

export function updateUserRights(
  id: number,
  { roles }: UserRolesRequest
): Promise<User> {
  return axiosInstance
    .post(`/admin/users/${id}/rights`, {
      roles,
    })
    .then(({ data }) => {
      return data;
    });
}

export function updateUserData(
  id: number,
  { username, email, phoneNumber }: UserRequest
): Promise<User> {
  return axiosInstance
    .put(`/admin/users/${id}`, {
      username,
      email,
      phoneNumber,
    })
    .then(({ data }) => {
      return data;
    });
}

export function blockUser(id: number): Promise<User> {
  return axiosInstance.post(`/admin/users/${id}/block`).then(({ data }) => {
    return data;
  });
}

export function unblockUser(id: number): Promise<User> {
  return axiosInstance.post(`/admin/users/${id}/unblock`).then(({ data }) => {
    return data;
  });
}

export function deleteUser(id: number): void {
  axiosInstance.delete(`/admin/users/${id}`);
}

export default axiosInstance;
