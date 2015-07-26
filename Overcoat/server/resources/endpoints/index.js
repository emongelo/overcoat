var config = require('../../config/config');

module.exports = {
  account : {
    method: 'get',
    path: config.basePath + '/account'
  }
};