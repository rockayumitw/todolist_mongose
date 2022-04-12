const Todo = require('../models/todos');
const { errorHandle, successHandle } = require('../handler');

const postTodo = async (res, body) => {
  try {
    const data = JSON.parse(body);
    const newTodo = await Todo.create({
      title: data.title,
      status: data.status,
    });
    successHandle(res, newTodo);
  } catch (error) {
    errorHandle(res, error.message || error);
  }
};

module.exports = postTodo;
