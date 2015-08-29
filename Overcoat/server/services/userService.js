var mocks = require('../resources/mocks/index');
var apiConnector = require('./api-connector')();
var models = require('../models/index');
var endpoints = require('../resources/endpoints/index');
var connectorOptions = {};

exports.userService = {
  getUser: function(userId) {
    var arr = mocks.users;
    var user = [];

    user = arr.filter(function(e){
      return e.id == userId
    });

    return user.shift();
  },

  getFriends: function() {
    var params = {};
    return apiConnector.call(endpoints.getFriends.method, endpoints.getFriends.path, params, connectorOptions, models.apiResponse);
  }
};