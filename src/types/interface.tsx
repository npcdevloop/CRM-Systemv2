import type { FormEvent } from "react";

export interface TodoRequest {
  title?: string,
  isDone?: boolean,
}

export interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export interface TodoInfo {
  all: number
  completed: number
  inWork: number
}

export interface MetaResponse<T, N> {
  data: T[]
  info?: N
  meta: {
    totalAmount: number
  }
}

export type Filter = 'all' | 'completed' | 'inWork'

<<<<<<< HEAD
export interface updateTasks {
    updateTasks: () => Promise<MetaResponse<Todo, TodoInfo>> | Promise<void>
}

export interface setTab {
    tab: Filter,
    setTab: (filter: Filter) => void
}

export interface validationTaskParams {
    event: FormEvent<HTMLFormElement>
    title: string
    setErrorText: (error: string) => void
    updateTasks: () => Promise<MetaResponse<Todo, TodoInfo>> | Promise<void>
    createTask?: (title: string) => Promise<void>
    updateTaskTitle?: (id: number, title: string) => Promise<void>
    setEdit?: (editState: boolean) => void
    id?: number
}
=======
>>>>>>> feature/ED-1376_AntdTodo
