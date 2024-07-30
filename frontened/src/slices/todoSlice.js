import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiConnector } from '../services/apiConnector';
 

 
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await apiConnector('get', '/getTodos');
  return response.data.todos;
});

export const createTodo = createAsyncThunk('todos/createTodo', async ({ title, description }) => {
  const response = await apiConnector('post', '/createTodo', { title, description });
  console.log("createtodo",response)
  const editId = response.data.data._id;
  localStorage.setItem("todoId",editId)
  return response.data.data;  
});

export const editTodo = createAsyncThunk('todos/editTodo', async ({ id, title, description }) => {
  const response = await apiConnector('put', `/updateTodo/${id}`, { title, description });
  
  
  return response.data.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await apiConnector('delete', `/deleteTodo/${id}`);
  return id;  
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos:[],  
    loading: false,
    error: '',
    todoId:localStorage.getItem("editId")
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;  
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.todos)) {
          state.todos = [];  
        }
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;  
        }
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const id = action.payload;
        state.todos = state.todos.filter((todo) => todo.id !== id); // Remove the deleted todo
      });
  },
});

export default todoSlice.reducer;
