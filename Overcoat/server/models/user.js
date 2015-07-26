var underscore = require('underscore');

exports.User = function(data) {
  var user = {};

  user.id = data.id || undefined;
  user.name = data.name || undefined;
  user.screenName = data.screenName || undefined;
  user.avatar = data.avatar || undefined;
  user.email = data.email || undefined;
  user.registered = data.birthday || undefined;

  return user;
};