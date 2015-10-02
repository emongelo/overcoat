var apiConnector = require('./api-connector')();
var models = require('../models/index');
var endpoints = require('../resources/endpoints/index');
var connectorOptions = {};

var coatService = {
  getSite: function(params) {
	  return apiConnector.call(endpoints.getSite.method, endpoints.getSite.path, params, connectorOptions, models.apiResponse);
  },

  getCoats: function(params) {
	  return apiConnector.call(endpoints.getCoats.method, endpoints.getCoats.path, params, connectorOptions, models.apiResponse);
  },

  search: function(params) {
    return apiConnector.call(endpoints.search.method, endpoints.search.path, params, connectorOptions, models.apiResponse);
  },

  postCoat: function(params) {
    return apiConnector.call(endpoints.postCoat.method, endpoints.postCoat.path, params, connectorOptions, models.apiResponse);
  },

  deleteCoat: function(params) {
    return apiConnector.call(endpoints.deleteCoat.method, endpoints.deleteCoat.path, params, connectorOptions, models.apiResponse);
  }
};

exports['coatService'] = coatService;