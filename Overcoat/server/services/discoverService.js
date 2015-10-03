var apiConnector = require('./api-connector')();
var models = require('../models/index');
var endpoints = require('../resources/endpoints/index');
var connectorOptions = {};

exports.discoverService = {
  getDiscover: function(params) {
	  return apiConnector.call(endpoints.getDiscover.method, endpoints.getDiscover.path, params, connectorOptions, models.apiResponse);
  }
};