const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '事項名稱必填'],
    },
    status: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    versionKey: false,
  }
);

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
