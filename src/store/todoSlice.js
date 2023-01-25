import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );

  return response.data.slice(0, 4);
});

export const addTodo = createAsyncThunk("todos/add", async (title) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/todos",
    { title, completed: false }
  );

  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/delete", async (todoId) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);

  return todoId;
});

export const editTodo = createAsyncThunk("todos/edit", async (data) => {
  const response = await axios.patch(
    `https://jsonplaceholder.typicode.com/todos/${data.todoId}`,
    data
  );

  return response.data;
});

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    items: [],
    status: "idle",
    error: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(addTodo.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = [action.payload, ...state.items];
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(deleteTodo.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = state.items.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(editTodo.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      console.log({ action });
      state.status = "succeeded";
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          item = {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
    });
    builder.addCase(editTodo.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
