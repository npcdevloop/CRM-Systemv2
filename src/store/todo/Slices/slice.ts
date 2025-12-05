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
      state.tab = tab;
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

export const { setTab } = todoSlice.actions;

export default todoSlice.reducer;
