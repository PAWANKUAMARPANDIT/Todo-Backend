import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ['Personal', 'Work', 'Other'], 
      default: 'Personal',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'], 
      required: true,
      default: 'low',
    },
    deadline: {
      type: Date,
      default: null, 
    },
  },
  { timestamps: true } 
);


export const Todo = mongoose.model('Todo', todoSchema);
