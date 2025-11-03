import type { Filter, MetaResponse, TodoInfo, Todo } from '../types/interface'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://easydev.club/api/v1/todos'
})

axiosInstance.interceptors.request.use(config => {
  if (config.method === 'put' || config.method === 'delete') {
    config.baseURL = `${config.baseURL}/${config.params.id}`
    delete config.params
    return config
  } else {
    return config
  }
})

export async function loadTasksByFilter (
  filter: Filter
): Promise<MetaResponse<Todo, TodoInfo>> {
  return axiosInstance
    .get('', {
      params: {
        filter: filter
      }
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw console.error(error)
    })
}

export async function createTask (title: string): Promise<void> {
  await axiosInstance
    .post('', {
      title: title,
      isDone: false
    })
    .catch(error => {
      throw console.error(error)
    })
}

export async function updateTaskTitle (id: number, title: string) {
  await axiosInstance
    .put(
      ``,
      {
        id,
        title
      },
      {
        params: {
          id
        }
      }
    )
    .catch(error => {
      throw console.error(error)
    })
}

export async function updateTaskByDoneFlag (id: number, isDone: boolean) {
  await axiosInstance
    .put(
      ``,
      {
        id,
        isDone
      },
      {
        params: {
          id
        }
      }
    )
    .catch(error => {
      throw console.error(error)
    })
}

export async function deleteTask (id: number) {
  await axiosInstance
    .delete(``, {
      params: {
        id
      }
    })
    .catch(error => {
      throw console.error(error)
    })
}
