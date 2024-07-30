import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { fetchTodos } from '../../slices/todoSlice';
 

const TodoApp = () => {
  const dispatch = useDispatch();
  const { todos,todoId, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">To-Do App</h1>
      <TodoInput />
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <TodoList todos={todos} todoId={todoId}/>
    </div>
  );
};

export default TodoApp;
