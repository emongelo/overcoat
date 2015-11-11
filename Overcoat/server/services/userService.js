var apiConnector = require('./api-connector')();
var models = require('../models/index');
var endpoints = require('../resources/endpoints/index');
var connectorOptions = {};

exports.userService = {
  getUser: function(params) {
	  return apiConnector.call(endpoints.getUser.method, endpoints.getUser.path, params, connectorOptions, models.apiResponse);
  },

	userLogin: function(params) {
		return apiConnector.call(endpoints.userLogin.method, endpoints.userLogin.path, params, connectorOptions, models.apiResponse);
	},

  getFriends: function(params) {
    return apiConnector.call(endpoints.getFriends.method, endpoints.getFriends.path, params, connectorOptions, models.apiResponse);
  },

	follow: function(params) {
		return apiConnector.call(endpoints.follow.method, endpoints.follow.path, params, connectorOptions, models.apiResponse);
	},

	unfollow: function(params) {
		return apiConnector.call(endpoints.unfollow.method, endpoints.unfollow.path, params, connectorOptions, models.apiResponse);
	},

	reportUser: function(params) {
		return apiConnector.call(endpoints.reportUser.method, endpoints.reportUser.path, params, connectorOptions, models.apiResponse);
	},

	muteUser: function(params) {
		return apiConnector.call(endpoints.muteUser.method, endpoints.muteUser.path, params, connectorOptions, models.apiResponse);
	}
};