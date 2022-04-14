const Todo = require('../models/todos');
const { errorHandle, successHandle } = require('../handler');

const patchTodo = async (res, url, body) => {
  try {
    const id = url.split('/').pop();
    const data = JSON.parse(body);
    const todos = await Todo.findByIdAndUpdate(id, data, { new: true });
    successHandle(res, todos);
  } catch (error) {
    errorHandle(res, error.message || error);
  }
};

module.exports = patchTodo;
