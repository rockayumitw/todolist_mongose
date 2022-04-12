const http = require('http');
const mongoose = require('mongoose');
const { header } = require('./config');
const dotenv = require('dotenv');
const { errorHandle, successHandle } = require('./handler');
const { getTodo, postTodo, deleteTodo, patchTodo } = require('./logic');
const Todo = require('./models/todos');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  //   .connect('mongodb://localhost:27017/todo')
  .connect(DB)
  .then(() => {
    console.log('connect success');
  })
  .catch((error) => {
    console.error(error.reason);
  });

const requestListener = (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  if (req.url == '/todos' && req.method == 'GET') {
    // getTodo.js
  } else if (req.url == '/todos' && req.method == 'POST') {
    // postTodo.js
  } else if (req.url == '/todos' && req.method == 'DELETE') {
    // deleteTodo.js
  } else if (req.url.startsWith('/todos/') && req.method == 'DELETE') {
    // deleteTodo.js
  } else if (req.url.startsWith('/todos/') && req.method == 'PATCH') {
    // patchTodo.js
  } else if (req.method == 'OPTIONS') {
    successHandle(res, {});
  } else {
    errorHandle(res, '無此路由', 404);
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT);
