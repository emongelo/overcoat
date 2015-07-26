var mocks = require('../resources/mocks/index');

exports.userService = {
  getUser: function(userId) {
    var arr = mocks.users;
    var user = [];

    user = arr.filter(function(e){
      return e.id == userId
    });

    return user.shift();
  }
};