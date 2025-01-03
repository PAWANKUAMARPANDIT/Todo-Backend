import { Router } from "express";
import { createTodo, allTodos, updateTodo, deleteTodo } from "../controller/todo.controller.js";
import authenticateUser from "../middleware/auth.middleware.js";

const router = Router();

router.post('/todos', authenticateUser, createTodo);
router.get('/todos', authenticateUser, allTodos);
router.put('/todos/:todoId', authenticateUser, updateTodo);
router.delete('/todos/:todoId', authenticateUser, deleteTodo);

export default router;
