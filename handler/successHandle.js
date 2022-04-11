const header = require('../config/header');

/**
 * @param {Object} res - res物件
 * @param {Array} todos - todolist
 */
function successHandle(res, todos) {
  res.writeHead(200, header);
  res.write(
    JSON.stringify({
      status: 'success',
      todos,
    })
  );
  res.end();
}

module.exports = successHandle;
