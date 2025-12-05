import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/Slices/slice";
import todoReducer from "./todo/Slices/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type State = typeof store;
export type AppDispatch = typeof store.dispatch;
