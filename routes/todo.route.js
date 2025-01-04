import { Router } from "express";
import { createTodo, allTodos, updateTodo, deleteTodo,filterByCategory,filterByCompleted,filterByDeadline,filterByPriority } from "../controller/todo.controller.js";
import authenticateUser from "../middleware/auth.middleware.js";

const router = Router();

router.post('/todos', authenticateUser, createTodo);
router.get('/todos', authenticateUser, allTodos);
router.put('/todos/:todoId', authenticateUser, updateTodo);
router.delete('/todos/:todoId', authenticateUser, deleteTodo);
router.get("/todos/filter/category",authenticateUser,filterByCategory);
router.get("/todos/filter/priority",authenticateUser,filterByPriority);
router.get("/todos/filter/deadline",authenticateUser,filterByDeadline);
router.get("/todos/filter/completed",authenticateUser,filterByCompleted);

export default router;
