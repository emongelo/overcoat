var _ = require('underscore');
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

	/**
	 * User data
	 */
	router.get("/account/:userId", function(req, res){
		var params = {
			userId: req.params.userId
		};

		sv.userService.getUser(params).then(function(serviceResponse){
			var user = serviceResponse.data;
			res.send(user);
		}).catch(function(err){
			if (err) {
				res.send(JSON.stringify(err));
			}
		});
	});

	/**
	 * Coats
	 */
  router.get("/coats", function(req, res){

	  var params = {
		  siteUrl: req.query.site
	  };

    sv.coatService.getSite(params).then(function(siteResponse){
	    params.site = siteResponse.data;

      sv.coatService.getCoats(params).then(function(coatsResponse){
        res.send({
          site: params.site,
          coats: coatsResponse.data
        });
      });
    });
  });

  router.post("/coat/post", function(req, res){
    var params = {
      userId: req.body.userId,
      coatText: req.body.coatText
    };

    sv.coatService.postCoat(params).then(function(res){
      res.send({status: 'success'});
    }, function(err){
      res.send({status: 'error', message: err});
    });
  });

  router.delete("/coat/delete", function(req, res){
    var params = {
      coatId: req.body.userId
    };

    sv.coatService.deleteCoat(params).then(function(res){
      res.send({status: 'success'});
    }, function(err){
      res.send({status: 'error', message: err});
    });
  });

  router.get("/search", function(req, res){
    var params = {
      q: req.query.q,
      type: req.query.type
    };

    sv.coatService.search(params).then(function(res){
      res.send({status: 'success'});
    }, function(err){
      res.send({status: 'error', message: err});
    });
  });

  router.get("/activity", function(req, res){
	  var params = {};
    sv.notificationService.getNotifications(params).then(function(serviceResponse){
      res.send(serviceResponse);
    }).catch(function(err){
      if (err) {
        res.send(JSON.stringify(err));
      }
    });
  });

  router.get("/user/friends", function(req, res){
	  var params = {
		  userId: req.query.userId
	  };

    sv.userService.getFriends(params).then(function(serviceResponse){
      res.send(serviceResponse);
    }, function(err){
      console.log('Se ha producido un error inesperado');
      res.send([]);
    })
  });

  router.get("/discover", function(req, res){
	  var params = {};
	  sv.notificationService.getNotifications(params).then(function(serviceResponse){
		  res.send(serviceResponse);
	  }).catch(function(err){
		  if (err) {
			  res.send(JSON.stringify(err));
		  }
	  });
  });

};

module.exports = controller;