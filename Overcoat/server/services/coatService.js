var apiConnector = require('./api-connector')();
var models = require('../models/index');
var endpoints = require('../resources/endpoints/index');
var connectorOptions = {};

exports.coatService = {
  getCoats: function(params) {
	  return apiConnector.call(endpoints.getCoats.method, endpoints.getCoats.path, params, connectorOptions, models.apiResponse);
  },

	getSiteCoatsFromTimestamp: function(params) {
		return apiConnector.call(endpoints.getSiteCoatsFromTimestamp.method, endpoints.getSiteCoatsFromTimestamp.path, params, connectorOptions, models.apiResponse);
	},

  postCoat: function(params) {
    return apiConnector.call(endpoints.postCoat.method, endpoints.postCoat.path, params, connectorOptions, models.apiResponse);
  },

  deleteCoat: function(params) {
    return apiConnector.call(endpoints.deleteCoat.method, endpoints.deleteCoat.path, params, connectorOptions, models.apiResponse);
  },

	postReply: function(params) {
		return apiConnector.call(endpoints.postReply.method, endpoints.postReply.path, params, connectorOptions, models.apiResponse);
	},

	deleteReply: function(params) {
		return apiConnector.call(endpoints.deleteReply.method, endpoints.deleteReply.path, params, connectorOptions, models.apiResponse);
	},

	upvote: function(params) {
		return apiConnector.call(endpoints.upvote.method, endpoints.upvote.path, params, connectorOptions, models.apiResponse);
	},

	downvote: function(params) {
		return apiConnector.call(endpoints.downvote.method, endpoints.downvote.path, params, connectorOptions, models.apiResponse);
	},

	tip: function(params) {
		return apiConnector.call(endpoints.tip.method, endpoints.tip.path, params, connectorOptions, models.apiResponse);
	},

	search: function(params) {
		return apiConnector.call(endpoints.search.method, endpoints.search.path, params, connectorOptions, models.apiResponse);
	}
};