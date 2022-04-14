const Todo = require('../models/todos');
const { errorHandle, successHandle } = require('../handler');

const deleteTodo = async (res, url) => {
  if (!url) {
    await Todo.deleteMany({});
    successHandle(res, []);
    return;
  }
  try {
    const id = url.split('/').pop();
    const todos = await Todo.findByIdAndDelete(id);
    todos ? successHandle(res, todos) : errorHandle(res, '該筆資料已經刪除。');
  } catch (error) {
    errorHandle(res, error.message || error);
  }
};

module.exports = deleteTodo;
