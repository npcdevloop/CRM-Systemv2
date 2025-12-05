import type { IAsyncParticle } from "../store/utils";

export interface TodoRequest {
  title?: string;
  isDone?: boolean;
}

export interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

export type Filter = "all" | "completed" | "inWork" | IAsyncParticle<Filter>;

export type NotificationType = "success" | "info" | "warning" | "error";
