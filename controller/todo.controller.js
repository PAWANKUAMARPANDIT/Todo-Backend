import { Todo } from "../models/todo.schema.js";

const createTodo = async (req, res) => {
  const { title, category, priority, deadline } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const todo = new Todo({
      title,
      category,
      priority,
      deadline,
    });

    const savedTodo = await todo.save();
    res.status(201).json({ message: "Created To-Do", data: savedTodo });
  } catch (err) {
    console.error("Error creating To-Do:", err);
    res.status(500).json({ message: err.message });
  }
};

const allTodos = async (req, res) => {
  const { category, priority, deadline } = req.query;
  let filter = {};

  if (category) filter.category = category;
  if (priority) filter.priority = priority;

  if (deadline) {
    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate)) {
      return res.status(400).json({ message: "Invalid date format for deadline" });
    }
    filter.deadline = { $lte: deadlineDate };
  }

  try {
    const todos = await Todo.find(filter);
    res.status(200).json({ message: "Fetched To-Dos", data: todos });
  } catch (err) {
    console.error("Error fetching To-Dos:", err);
    res.status(500).json({ message: err.message });
  }
};

const updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { title, category, priority, deadline, completed } = req.body;

  if (!todoId) {
    return res.status(400).json({ message: "To-Do ID is required" });
  }

  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "To-Do not found" });
    }

    if (title) todo.title = title;
    if (category) todo.category = category;
    if (priority) todo.priority = priority;
    if (deadline) todo.deadline = deadline;
    if (completed !== undefined) todo.completed = completed;

    const updatedTodo = await todo.save();
    res.status(200).json({ message: "Updated To-Do", data: updatedTodo });
  } catch (err) {
    console.error("Error updating To-Do:", err);
    res.status(500).json({ message: err.message });
  }
};

const deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  if (!todoId) {
    return res.status(400).json({ message: "To-Do ID is required" });
  }

  try {
    const todo = await Todo.findByIdAndDelete(todoId);
    if (!todo) {
      return res.status(404).json({ message: "To-Do not found" });
    }

    res.status(200).json({ message: "Deleted To-Do", data: todo });
  } catch (err) {
    console.error("Error deleting Todo:", err);
    res.status(500).json({ message: err.message });
  }
};

export { createTodo, allTodos, updateTodo, deleteTodo };
