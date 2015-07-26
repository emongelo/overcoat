var _ = require('underscore');
var mocks = require('../resources/mocks/index');
var sv = require('./userService');

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
  }
};

function inflateCoat(coat) {
  // Fill with user data
  coat.user = sv.userService.getUser(coat.userId);

  coat.replies = coatService.getReplies(coat.id);

  return coat;
}

exports['coatService'] = coatService;