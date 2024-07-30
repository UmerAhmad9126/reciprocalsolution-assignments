import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from '../../slices/todoSlice';
 

const TodoInput = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      dispatch(createTodo({
        title,
        description
      }));
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          placeholder="Enter title"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          placeholder="Enter description"
        ></textarea>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Add To-Do
      </button>
    </form>
  );
};

export default TodoInput;
