var _ = require('underscore');
var mocks = require('../resources/mocks/index');
var sv = require('../services/index');
var models = require('../models/index');

/**
 * Default controller
 * @param router
 */
var controller = function(router){

  /**
   * Test page
   */
  router.get("/test",function(req, res){
    res.render('test', req);
  });

  /**
   * Main frame
   */
  router.get("/",function(req, res){
    res.render('main', req);
  });

  router.get("/coats", function(req, res){
    var site = req.query.site;
    site = 'www.whitehouse.gov';

    sv.coatService.getSite(site).then(function(site){
      sv.coatService.getCoats(site.id).then(function(coats){
        res.send({
          site: site,
          coats: coats
        });
      });
    });
  });

  router.get("/activity", function(req, res){
    sv.notificationService.getNotifications().then(function(serviceResponse){
      var activities = serviceResponse;
      res.send(activities);
    }).catch(function(err){
      if (err) {
        res.send(JSON.stringify(err));
      }
    });
  });

  router.get("/account", function(req, res){
    var userId = req.query.userId;
    var user = sv.userService.getUser(userId);

    res.send(user);
  });

  router.get("/discover", function(req, res){
    res.send({});
    /* return;

    var promises = [
      sv.coatService.getHotSites(),
      sv.coatService.getNewSites(),
      sv.coatService.getTopCoaters(),
      sv.coatService.getHotCoats()
    ];

    promises.all(function(responses){
      res.send({});
    });*/

  });

};

module.exports = controller;