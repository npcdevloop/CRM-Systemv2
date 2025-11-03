import type { RefObject } from "react";

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
    tab?: Filter,
    setTab: (filter: Filter) => void
}

export interface setTimerId {
    timerId?: number,
    setTimerId: (timerId: number) => void
}

export type FieldType = {
    title: string;
};

export interface timerId {
    delay?: number;
    timerId?: RefObject<number | null>
    setTimerId?: (timer: number) => void
}

