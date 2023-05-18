import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  pathBase,
  pathLogin,
  pathRegister,
  pathTodoAdd,
  pathTodoDelete,
  pathTodoList,
  pathTodoToggle,
} from "src/path";
import { RootState } from "src/redux/store";

export type Todo = {
  id: number;
  is_done: boolean;
  text: string;
};

export const todoApi = createApi({
  reducerPath: "todoApi",
  tagTypes: ["todos"],

  baseQuery: fetchBaseQuery({
    baseUrl: pathBase,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      console.log(token);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    getAll: build.query<Todo[], void>({
      query: () => ({
        url: pathTodoList,
        method: "GET",
      }),
      providesTags: [{ type: "todos" }],
    }),

    addTodo: build.mutation<undefined, string>({
      query: (todoText) => ({
        url: pathTodoAdd,
        method: "POST",
        body: { text: todoText },
      }),
      invalidatesTags: [{ type: "todos" }],
    }),

    toggleTodo: build.mutation<undefined, number>({
      query: (todoId) => ({
        url: pathTodoToggle.replace(/{:id}/, String(todoId)),
        method: "PUT",
      }),
      invalidatesTags: [{ type: "todos" }],
    }),

    removeTodo: build.mutation<undefined, number>({
      query: (todoId) => ({
        url: pathTodoToggle.replace(/{:id}/, String(todoId)),
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "todos" }],
    }),
  }),
});

export const {
  useGetAllQuery,
  useAddTodoMutation,
  useToggleTodoMutation,
  useRemoveTodoMutation,
} = todoApi;
