import { createSlice } from "@reduxjs/toolkit";
import { initialStateTodo } from "../../initialState";
import { addAsyncBuilderCases } from "../../utils";
import {
  createTodosTask,
  deleteTodosTask,
  fetchTodosByFilter,
  updateTodosTaskState,
} from "../../apiThunk";

const todoSlice = createSlice({
  name: "todo",
  initialState: initialStateTodo,
  reducers: {
    setTab: (state, action) => {
      const tab = action.payload;
      state.filter.data = tab;
    },
    replaceTodosData(state, action) {
      const taskPayload = action.payload;
      if (!state.todos.data?.data) {
        return;
      }

      state.todos.data.data = state.todos.data.data.filter(
        (task) => task.id !== taskPayload
      );
    },
  },
  extraReducers: (builder) => {
    addAsyncBuilderCases(builder, fetchTodosByFilter, "todos");
    addAsyncBuilderCases(builder, createTodosTask, "createTaskRequest");
    addAsyncBuilderCases(
      builder,
      updateTodosTaskState,
      "updateTaskStateRequest"
    );
    addAsyncBuilderCases(builder, deleteTodosTask, "deleteTaskRequest");
  },
});

export const { setTab, replaceTodosData } = todoSlice.actions;

export default todoSlice.reducer;
