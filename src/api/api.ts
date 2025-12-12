import type {
  Filter,
  MetaResponse,
  TodoInfo,
  Todo,
  TodoRequest,
} from "../types/todo";
import axios from "axios";
import { logOut, setAuth } from "../store/auth/Slices/slice";
import type { Profile, Token } from "../types/user";
import { getAccessToken, setAccessToken } from "../utils/auth";
import type { AppDispatch, AppStore } from "../store";

let dispatch: AppDispatch;

export const injectStore = (_store: AppStore) => {
  dispatch = _store.dispatch;
};

const axiosInstance = axios.create({
  baseURL: "https://easydev.club/api/v1",
});

let isRefreshRequest = false;

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken();

  if (config.url === "/auth/signin") {
    return config;
  }
  if (config.url === "/todos" && !accessToken && !isRefreshRequest) {
    isRefreshRequest = true;
    try {
      const refreshTokenItem = localStorage.getItem("refreshToken");
      const { accessToken, refreshToken } = await refreshAccessToken(
        refreshTokenItem
      );
      localStorage.setItem("refreshToken", refreshToken);
      setAccessToken(accessToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    } catch (error) {
      localStorage.removeItem("refreshToken");
      setAccessToken("");
      dispatch(logOut());
      window.location.href = "/auth";
      throw new Error(`Не удалось авторизовать пользователя: ${error}`);
    } finally {
      isRefreshRequest = false;
    }
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  } else {
    return config;
  }
});

let isRefreshResponse = false;

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status == 401 && error.config.url === "/auth/refresh") {
      throw Error("Токен обновления истек!");
    }

    if (error.response.status == 401 && error.config.url === "/auth/signin") {
      throw error;
    }

    if (error.response.status == 401 && error.config && !isRefreshResponse) {
      isRefreshResponse = true;
      try {
        const refreshTokenItem = localStorage.getItem("refreshToken");
        const { accessToken, refreshToken } = await refreshAccessToken(
          refreshTokenItem
        );
        localStorage.setItem("refreshToken", refreshToken);
        await setAccessToken(accessToken);
        dispatch(setAuth(true));

        return axiosInstance.request(originalRequest);
      } catch (error) {
        localStorage.removeItem("refreshToken");
        await setAccessToken("");
        dispatch(logOut());
        window.location.href = "/auth";
        throw new Error(`Не удалось авторизовать пользователя: ${error}`);
      } finally {
        isRefreshResponse = false;
      }
    }
    throw error;
  }
);

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
