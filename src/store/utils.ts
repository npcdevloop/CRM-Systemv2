import type {
  ActionReducerMapBuilder,
  AsyncThunk,
  Draft,
  SerializedError,
} from "@reduxjs/toolkit";

export interface IErrorData {
  errorMessage: string;
}

export interface IAsyncParticle<T> {
  data: T | null;
  error: IErrorData | SerializedError | null;
  errorCounter: number;
  status: "idle" | "pending" | "fulfilled" | "rejected";
}

export interface IAsyncDataStatus {
  hasError: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isLoadingOrIdle: boolean;
  isLoaded: boolean;
  isLoadedOrError: boolean;
}

// Алиасы
// RS = Response State (ответ сервера)
// RQ = Request Query (аргументы запроса)
export type TSliceMethod<RS, RQ> = AsyncThunk<
  RS,
  RQ,
  { rejectValue: IErrorData }
>;

// Eсли нет отдельного типа для пагинации
export type TPaginationSliceMethod<RS> = AsyncThunk<RS, any, any>;

export const initAsyncParticle = <T>(
  data: T | null = null
): IAsyncParticle<T> => ({
  data,
  error: null,
  errorCounter: 0,
  status: "idle",
});

export const addAsyncBuilderCases = <
  TState extends Record<string, unknown>,
  RQ,
  RS
>(
  builder: ActionReducerMapBuilder<TState>,
  sliceMethod: TSliceMethod<RQ, RS> | TPaginationSliceMethod<RS>,
  key: keyof TState
) => {
  builder.addCase(sliceMethod.pending, (state: Draft<TState>) => {
    state[String(key)].status = "pending";
  });
  builder.addCase(sliceMethod.fulfilled, (state: Draft<TState>, action) => {
    state[String(key)].status = "fulfilled";
    state[String(key)].errorCounter = 0;
    state[String(key)].data = action.payload;
  });
  builder.addCase(sliceMethod.rejected, (state: Draft<TState>, action) => {
    state[String(key)].error = action.payload;
    state[String(key)].errorCounter =
      (state[String(key)].errorCounter ?? 0) + 1;
    state[String(key)].status = "rejected";
  });
};

export const getAsyncDataStatus = (
  data: IAsyncParticle<unknown>
): IAsyncDataStatus => ({
  hasError: data?.status === "rejected",
  isIdle: data?.status === "idle",
  isLoading: data?.status === "pending",
  isLoadingOrIdle: data?.status === "pending" || data?.status === "idle",
  isLoaded: data?.status === "fulfilled",
  isLoadedOrError: data?.status === "fulfilled" || data?.status === "rejected",
});

export const getAsyncRequestData = <T>(
  stateParam: IAsyncParticle<T>
): {
  errorCounter: number | undefined;
  data: T | null;
  error: IErrorData | SerializedError | null | undefined;
  status: IAsyncDataStatus;
} => ({
  data: stateParam?.data,
  error: stateParam?.error,
  errorCounter: stateParam?.errorCounter,
  status: getAsyncDataStatus(stateParam),
});
