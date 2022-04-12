const Todo = require('../models/todos');
const { errorHandle, successHandle } = require('../handler');

const getTodo = async (res) => {
  try {
    const todos = await Todo.find();
    successHandle(res, todos);
  } catch {
    errorHandle(res, '取得發生問題，請稍後再試。');
  }
};

module.exports = getTodo;
