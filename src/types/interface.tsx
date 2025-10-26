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

export interface updateTasks {
    updateTasks: () => Promise<MetaResponse<Todo, TodoInfo>> | Promise<void>
}

export interface setTab {
    tab: Filter,
    setTab: (filter: Filter) => void
}
