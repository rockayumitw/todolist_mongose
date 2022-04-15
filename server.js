const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { errorHandle, successHandle } = require('./handler');
const { getTodo, postTodo, deleteTodo, patchTodo } = require('./logic');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect('mongodb://localhost:27017/todo')
  .connect(DB)
  .then(() => {
    console.log('connect success');
  })
  .catch((error) => {
    console.error(error.reason);
  });

const requestListener = (req, res) => {
  let body = '';

  req.on('data', (chunk) => (body += chunk));

  switch (req.method) {
    case 'GET':
      if (req.url == '/todos') getTodo(res);
      if (req.url.startsWith('/todos/')) getTodo(res, req.url);
      break;
    case 'POST':
      if (req.url == '/todos') req.on('end', () => postTodo(res, body));
      break;
    case 'DELETE':
      if (req.url == '/todos') deleteTodo(res);
      if (req.url.startsWith('/todos/')) deleteTodo(res, req.url);
      break;
    case 'PATCH':
      if (req.url.startsWith('/todos/'))
        req.on('end', () => patchTodo(res, req.url, body));
      break;
    case 'OPTIONS':
      successHandle(res, {});
      break;
    default:
      errorHandle(res, '無此路由', 404);
      break;
  }
};

http.createServer(requestListener).listen(process.env.PORT);
