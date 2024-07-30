import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo } from '../../slices/todoSlice';
const id = localStorage.getItem("todoId");
// console.log('id:', id);



const TodoList = ({ todos, todoId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id, title, description) => {
    const newTitle = prompt("Edit title", title);
    const newDescription = prompt("Edit description", description);
    if (newTitle && newDescription) {
      dispatch(editTodo({ id, title: newTitle, description: newDescription }));
    }
  };

  if (!todos || todos.length === 0) {
    return <p className="text-center">No todos available</p>;
  }

  return (
    <ul className="list-disc list-inside">
      {todos.map((todo, index) => (
        <li key={index} className="mb-2">
          <h3 className="text-lg font-semibold">{todo.title}</h3>
          <p>{todo.description}</p>
          <button
            className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded"
            onClick={() => handleEdit(todo, todo.title, todo.description)}
          >
            Edit
          </button>
          <button
            className="px-2 py-1 bg-red-500 text-black rounded"
            onClick={() => handleDelete(todoId)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
