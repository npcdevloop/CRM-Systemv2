import type {
  Filter,
  MetaResponse,
  TodoInfo,
  Todo,
  TodoRequest,
} from "../types/interface";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://easydev.club/api/v1",
});

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

export async function createTask(title: string): Promise<void> {
  await axiosInstance
    .post("/todos", {
      title: title,
      isDone: false,
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
