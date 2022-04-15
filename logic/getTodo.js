const Todo = require('../models/todos');
const { errorHandle, successHandle } = require('../handler');

const getTodo = async (res, url) => {
  try {
    if (!url) {
      const todos = await Todo.find();
      successHandle(res, todos);
    } else {
      const id = url.split('/').pop();
      const todos = await Todo.findByIdAndDelete(id);
      todos ? successHandle(res, todos) : errorHandle(res, '無此筆資料。');
    }
  } catch {
    errorHandle(res, '取得發生問題，請稍後再試。');
  }
};

module.exports = getTodo;
