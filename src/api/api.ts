import type { Filter, MetaResponse, TodoInfo, Todo } from '../types/interface'
import axios from 'axios'

const baseURL = 'https://easydev.club/api/v1/todos'

export async function loadTasksByFilter (
  filter: Filter
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response = await axios.get(`${baseURL}?filter=${filter}`)
    return response.data
  } catch (error) {
    throw console.log(error)
  }
}

export async function createTask (title: string) {
  try {
    await axios.post(baseURL, {
      title: title,
      isDone: false
    })
  } catch (error) {
    throw console.log(error)
  }
}

export async function updateTaskTitle (id: number, title: string) {
  try {
    await axios.put(`${baseURL}/` + id, {
      id: id,
      title: title
    })
  } catch (error) {
    throw console.log(error)
  }
}

export async function updateTaskByDoneFlag (id: number, isDone: boolean) {
  try {
    await axios.put(`${baseURL}/` + id, {
      id: id,
      isDone: isDone
    })
  } catch (error) {
    throw console.log(error)
  }
}

export async function deleteTask (id: number) {
  try {
    await axios.delete(`${baseURL}/` + id)
  } catch (error) {
    throw console.log(error)
  }
}
