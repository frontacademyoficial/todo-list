import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );

  return response.data.splice(0, 2);
});

export const addTodo = createAsyncThunk("todo/addTodo", async (todo) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/todos",
    todo
  );

  return response.data;
});

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (todoId) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`
    );

    return response.data;
  }
);

export const updateTodo = createAsyncThunk("todo/updateTodo", async (data) => {
  const response = await axios.patch(
    `https://jsonplaceholder.typicode.com/todos/${data.todoId}`,
    data.values
  );

  return response.data;
});

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    status: "idle",
    addStatus: "idle",
    error: "",
    items: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addTodo.pending, (state, action) => {
        state.addStatus = "loading";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.items = [action.payload, ...state.items];
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteTodo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((item) => item.id !== action.meta.arg);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateTodo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }

          return item;
        });
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectTodoItems = (state) => state.todo.items ?? [];
export const selectTodoAddStatus = (state) => state.todo.addStatus;
