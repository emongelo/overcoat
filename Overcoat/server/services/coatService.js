var _ = require('underscore');
var mocks = require('../resources/mocks/index');
var sv = require('./userService');
var apiConnector = require('./api-connector')();
var models = require('../models/index');
var endpoints = require('../resources/endpoints/index');
var connectorOptions = {};

var coatService = {
  getSite: function(site) {
    return new Promise(
      function(resolve, reject) {
        var arr = mocks.sites;

        var sites = arr.filter(function(e){
          return e.name == site
        });

        resolve(sites.shift());
      });
  },

  getCoat: function(coatId) {

    if ( !_.isNumber(coatId) ) return coatId;

    var arr = mocks.coats;

    var res = arr.filter(function(e){
      return e.id == coatId
    });

    var coat = res.shift();
    return inflateCoat(coat);
  },

  getCoats: function(siteId) {
    return new Promise(function(resolve, reject) {
      var arr = mocks.coats;

      var coats = arr.filter(function (e) {
        return e.siteId == siteId
      });

      coats.forEach(function (coat, k) {
        coats[k] = inflateCoat(coat);
      });

      resolve(coats);
    });
  },

  getReplies: function(coatId) {
    var arr = mocks.replies;

    var replies = arr.filter(function(e){
      return e.coatId == coatId
    });

    replies.forEach(function(reply, y) {

      // Fill with user data
      replies[y].user = sv.userService.getUser(reply.userId);

    });

    return replies;
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

function inflateCoat(coat) {
  // Fill with user data
  coat.user = sv.userService.getUser(coat.userId);

  coat.replies = coatService.getReplies(coat.id);

  return coat;
}

exports['coatService'] = coatService;