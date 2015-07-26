var underscore = require('underscore');

exports.Coat = function(data) {
  var coat = {};

  coat.id = data.id || undefined;
  coat.name = data.name || undefined;
  coat.site = data.site || undefined;
  coat.userId = data.userId || undefined;
  coat.date = data.date || undefined;

  return coat;
};