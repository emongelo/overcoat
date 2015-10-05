var apiConnector = require('./api-connector')();
var models = require('../models/index');
var endpoints = require('../resources/endpoints/index');
var connectorOptions = {};

exports.notificationService = {
  getNotifications: function(params) {
	  return apiConnector.call(endpoints.getNotifications.method, endpoints.getNotifications.path, params, connectorOptions, models.apiResponse);
  },
	getInvitations: function(params) {
		return apiConnector.call(endpoints.getInvitations.method, endpoints.getInvitations.path, params, connectorOptions, models.apiResponse);
	},
	acceptInvitation: function(params) {
		return apiConnector.call(endpoints.acceptInvitation.method, endpoints.acceptInvitation.path, params, connectorOptions, models.apiResponse);
	},
	rejectInvitation: function(params) {
		return apiConnector.call(endpoints.rejectInvitation.method, endpoints.rejectInvitation.path, params, connectorOptions, models.apiResponse);
	}
};