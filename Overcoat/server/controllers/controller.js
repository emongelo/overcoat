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
  router.get("/coats/get-coats", function(req, res){

	  var params = {
		  siteUrl: req.query.site,
		  filter: req.query.filter
	  };

    sv.coatService.getCoats(params).then(function(coatsResponse){
      res.send({coats: coatsResponse.data});
    });

  });

  router.post("/coats/post", function(req, res){
    var params = {
      userId: req.body.userId,
      coatText: req.body.coatText
    };

    sv.coatService.postCoat(params).then(function(serviceResponse){
	    res.send({status: 'success'});
    });
  });

  router.delete("/coats/delete", function(req, res){
    var params = {
      coatId: req.body.coatId
    };

    sv.coatService.deleteCoat(params).then(function(serviceResponse){
      res.send({status: 'success'});
    });
  });

	/*
	 * Replies
	 */

	router.post("/replies/post", function(req, res){
		var params = {
			userId: req.body.userId,
			replyText: req.body.replyText
		};

		sv.coatService.postReply(params).then(function(serviceResponse){
			res.send({status: 'success'});
		});
	});

	router.delete("/replies/delete", function(req, res){
		var params = {
			replyId: req.body.replyId
		};

		sv.coatService.deleteReply(params).then(function(serviceResponse){
			res.send({status: 'success'});
		});
	});

	/*
	* Actions
	*/

	// Upvote
	router.post("/upvote", function(req, res){
		var params = {
			replyId: req.body.replyId
		};

		sv.coatService.upvote(params).then(function(serviceResponse){
			res.send({status: 'success'});
		});
	});

	// Downvote
	router.post("/downvote", function(req, res){
		var params = {
			replyId: req.body.replyId
		};

		sv.coatService.downvote(params).then(function(serviceResponse){
			res.send({status: 'success'});
		});
	});

	// Tip
	router.post("/tip", function(req, res){
		var params = {
			replyId: req.body.replyId
		};

		sv.coatService.tip(params).then(function(serviceResponse){
			res.send({status: 'success'});
		});
	});

	// Follow
	router.post("/follow", function(req, res){
		var params = {
			userId: req.body.userId
		};

		sv.userService.follow(params).then(function(serviceResponse){
			res.send({status: 'success'});
		});
	});

	// Unfollow
	router.post("/unfollow", function(req, res){
		var params = {
			userId: req.body.userId
		};

		sv.userService.unfollow(params).then(function(serviceResponse){
			res.send({status: 'success'});
		});
	});

	// Activity
	router.get("/activity", function(req, res){
		var params = {};
		sv.notificationService.getNotifications(params).then(function(serviceResponse){
			res.send(serviceResponse.data);
		}).catch(function(err){
			if (err) {
				res.send(JSON.stringify(err));
			}
		});
	});

	// Discover
	router.get("/discover", function(req, res){
		var params = {
			filter: req.query.filter
		};
		sv.discoverService.getDiscover(params).then(function(serviceResponse){
			res.send(serviceResponse.data);
		}).catch(function(err){
			if (err) {
				res.send(JSON.stringify(err));
			}
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

};

module.exports = controller;