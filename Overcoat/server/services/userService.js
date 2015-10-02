var apiConnector = require('./api-connector')();
var models = require('../models/index');
var endpoints = require('../resources/endpoints/index');
var connectorOptions = {};

exports.userService = {
  getUser: function(params) {
	  return apiConnector.call(endpoints.getUser.method, endpoints.getUser.path, params, connectorOptions, models.apiResponse);
  },

  getFriends: function(params) {
    return apiConnector.call(endpoints.getFriends.method, endpoints.getFriends.path, params, connectorOptions, models.apiResponse);
  }
};