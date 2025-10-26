import type { Filter, MetaResponse, TodoInfo, Todo } from '../types/interface'

const baseURL = 'https://easydev.club/api/v1/todos'

export async function loadTasksByFilter (
  filter: Filter
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response = await fetch(`${baseURL}?filter=${filter}`)
    const resData = await response.json()
    return resData
  } catch (error) {
    throw console.log(error)
  }
}

export async function createTask (title: string) {
  const taskData = {
    title: title,
    isDone: false
  }

  try {
    await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })
  } catch (error) {
    throw console.log(error)
  }
}

export async function updateTaskTitle (id: number, title: string) {
  const taskData = {
    id: id,
    title: title
  }

  try {
    await fetch(`${baseURL}/` + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })
  } catch (error) {
    throw console.log(error)
  }
}

export async function updateTaskByDoneFlag (id: number, isDone: boolean) {
  const taskData = {
    id: id,
    isDone: isDone
  }

  try {
    await fetch(`${baseURL}/` + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })
  } catch (error) {
    throw console.log(error)
  }
}

export async function deleteTask (id: number) {
  try {
    await fetch(`${baseURL}/` + id, {
      method: 'DELETE'
    })
  } catch (error) {
    throw console.log(error)
  }
}
