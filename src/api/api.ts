import type { Filter, MetaResponse, TodoInfo, Todo } from '../types/interface'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://easydev.club/api/v1'
})

axiosInstance.interceptors.request.use(config => {
  if (config.method === 'put' || config.method === 'delete') {
    config.url = `${config.url}/${config.params.id}`
    delete config.params

    if (config.data.isDone === undefined) delete config.data.isDone
    if (config.data.title === undefined) delete config.data.title

    return config
  } else {
    return config
  }
})

export async function loadTasksByFilter (
  filter: Filter
): Promise<MetaResponse<Todo, TodoInfo>> {
  return await axiosInstance
    .get('/todos', {
      params: {
        filter: filter
      }
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw new Error(`Ошибка при фильтрации задач:\n${error}`)
    })
}

export async function createTask (title: string): Promise<void> {
  await axiosInstance
    .post('/todos', {
      title: title,
      isDone: false
    })
    .catch(error => {
      throw new Error(`Ошибка при создании задачи:\n${error}`)
    })
}

export async function updateTaskState (
  id: number,
  ...args: Array<string | boolean>
): Promise<void> {
  let title, isDone

  for (const data of args) {
    if (typeof data === 'string') {
      title = data
    } else if (typeof data === 'boolean') {
      isDone = data
    } else {
      throw new Error(
        'Ошибка при определении типа аргумента\nпри вызове обновления состояния задачи!'
      )
    }
  }

  await axiosInstance
    .put(
      `/todos`,
      {
        id,
        title,
        isDone
      },
      {
        params: {
          id
        }
      }
    )
    .catch(error => {
      throw new Error(`Ошибка при обновлении заголовка задачи:\n${error}`)
    })
}

export async function deleteTask (id: number): Promise<void> {
  await axiosInstance
    .delete(`/todos`, {
      params: {
        id
      }
    })
    .catch(error => {
      throw new Error(`Ошибка при удалении задачи:\n${error}`)
    })
}
