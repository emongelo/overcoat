var apiConnector = require('./api-connector')();
var models = require('../models/index');
var endpoints = require('../resources/endpoints/index');
var connectorOptions = {};

exports.notificationService = {
  getNotifications: function(params) {
	  return apiConnector.call(endpoints.getNotifications.method, endpoints.getNotifications.path, params, connectorOptions, models.apiResponse);
  }
};