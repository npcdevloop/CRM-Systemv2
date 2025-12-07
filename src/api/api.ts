import type {
  Filter,
  MetaResponse,
  TodoInfo,
  Todo,
  TodoRequest,
} from "../types/interface";
import axios from "axios";
import { logOut, setAuth } from "../store/auth/Slices/slice";
import type { Profile, Token } from "../types/interface_user";
import { getAccessToken, setAccessToken } from "../utils/auth";
import type { State } from "../store";

let store: State;

export const injectStore = (_store: State) => {
  store = _store;
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
      await setAccessToken(accessToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    } catch (error) {
      localStorage.removeItem("refreshToken");
      await setAccessToken("");
      store.dispatch(logOut());
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

    if (error.response.status == 401 && error.config && !isRefreshResponse) {
      isRefreshResponse = true;
      try {
        const refreshTokenItem = localStorage.getItem("refreshToken");
        const { accessToken, refreshToken } = await refreshAccessToken(
          refreshTokenItem
        );
        localStorage.setItem("refreshToken", refreshToken);
        await setAccessToken(accessToken);
        store.dispatch(setAuth(true));

        return axiosInstance.request(originalRequest);
      } catch (error) {
        localStorage.removeItem("refreshToken");
        await setAccessToken("");
        store.dispatch(logOut());
        window.location.href = "/auth";
        throw new Error(`Не удалось авторизовать пользователя: ${error}`);
      } finally {
        isRefreshResponse = false;
      }
    }
    throw error;
  }
);

export async function loadTasksByFilter(
  filter: Filter
): Promise<MetaResponse<Todo, TodoInfo>> {
  return await axiosInstance
    .get("/todos", {
      params: {
        filter: filter,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`Ошибка при фильтрации задач:\n${error}`);
    });
}

export async function createTask(title: string): Promise<Todo> {
  return await axiosInstance
    .post("/todos", {
      title: title,
      isDone: false,
    })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw new Error(`Ошибка при создании задачи:\n${error}`);
    });
}

export async function updateTaskState(
  id: number,
  { title, isDone }: TodoRequest
): Promise<void> {
  await axiosInstance
    .put(
      `/todos/${id}`,
      {
        title,
        isDone,
      },
      {
        params: {
          id,
        },
      }
    )
    .catch((error) => {
      throw new Error(`Ошибка при обновлении состояния задачи:\n${error}`);
    });
}

export async function deleteTask(id: number): Promise<void> {
  await axiosInstance
    .delete(`/todos/${id}`, {
      params: {
        id,
      },
    })
    .catch((error) => {
      throw new Error(`Ошибка при удалении задачи:\n${error}`);
    });
}

export async function registrationUser(
  email: string,
  login: string,
  password: string,
  phoneNumber: string,
  username: string
): Promise<void> {
  await axiosInstance
    .post("/auth/signup", {
      email,
      login,
      password,
      phoneNumber,
      username,
    })
    .catch((error) => {
      throw new Error(`Ошибка при регистрации:\n${error}`);
    });
}

export async function authUser(
  login: string,
  password: string
): Promise<Token> {
  return await axiosInstance
    .post("/auth/signin", {
      login,
      password,
    })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw new Error(`Ошибка при авторизации:\n${error}`);
    });
}

export async function logoutUser(): Promise<void> {
  await axiosInstance.post("/user/logout").catch((error) => {
    throw new Error(`Ошибка при выходе из системы:\n${error}`);
  });
}

export async function refreshAccessToken(
  refreshToken: string | null
): Promise<Token> {
  return await axiosInstance
    .post("/auth/refresh", {
      refreshToken,
    })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw new Error(`Ошибка при обновлении ключа доступа:\n${error}`);
    });
}

export async function loadUserProfile(): Promise<Profile> {
  return await axiosInstance
    .get("/user/profile")
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw new Error(`Ошибка при загрузке данных профиля:\n${error}`);
    });
}
