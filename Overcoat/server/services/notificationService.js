var mocks = require('../resources/mocks/index');
var models = require('../models/index');
var userService = require('./userService').userService;
var coatService = require('./coatService').coatService;

exports.notificationService = {
  getNotifications: function() {
    return new Promise(
      function(resolve, reject) {

        var arr = mocks.notifications;
        arr.forEach(function (e) {

          e.user = userService.getUser(e.userId);

          if (e.coatId) {
            e.coat = coatService.getCoat(e.coatId);
          }
        });

        resolve(arr);
      });

  }
};