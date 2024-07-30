const express = require('express');
const router = express.Router();

const { createTodo } = require('../../controller/CreateTodo');
const { getTodo, getTodoById } = require('../../controller/GetTodo');
const { updateTodo } = require('../../controller/UpdateTodo');
const { deleteTodo } = require('../../controller/DeleteTodo');
 

router.post("/createTodo", createTodo);
router.get("/getTodos", getTodo);
router.get("/getTodos/:id", getTodoById);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;
