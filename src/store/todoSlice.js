import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    items: [
      { id: 1, completed: false, text: "TODO 1" },
      { id: 2, completed: true, text: "TODO 2" },
      { id: 3, completed: true, text: "TODO 3" },
      { id: 4, completed: true, text: "TODO 4" },
    ],
    loading: false,
  },
  reducers: {
    addTodo: (state, action) => {
      state.loading = true;

      state.items = [action.payload, ...state.items];

      state.loading = false;
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    editTodo: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.todoId) {
          item[action.payload.field] = action.payload.value;
        }
        return item;
      });
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;
