var _ = require('underscore');
var sv = require('../services/index');
var models = require('../models/index');
var Twitter = require('node-twitter-api');
var request = require('request');
var path = require('path');
var qs = require('querystring');

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
	  req.siteURI = req.query.site;
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

	router.get("/site/new-coats", function(req, res){

		var params = {
			siteUrl: req.query.site,
			from: req.query.from
		};

		sv.coatService.getSiteCoatsFromTimestamp(params).then(function(coatsResponse){
			res.send(coatsResponse.data);
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

	// Invitations
	router.get("/invitations", function(req, res){
		var params = {};
		sv.notificationService.getInvitations(params).then(function(serviceResponse){
			res.send(serviceResponse.data);
		}).catch(function(err){
			if (err) {
				res.send(JSON.stringify(err));
			}
		});
	});

	router.get("/invitations/accept", function(req, res){
		var params = {};
		sv.notificationService.acceptInvitation(params).then(function(serviceResponse){
			res.send(serviceResponse.data);
		}).catch(function(err){
			if (err) {
				res.send(JSON.stringify(err));
			}
		});
	});

	router.get("/invitations/reject", function(req, res){
		var params = {};
		sv.notificationService.rejectInvitation(params).then(function(serviceResponse){
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

	router.post("/user/report", function(req, res){
		var params = {
			userId: req.query.userId
		};

		sv.userService.reportUser(params).then(function(serviceResponse){
			res.send(serviceResponse);
		}, function(err){
			console.log('Se ha producido un error inesperado');
			res.send([]);
		})
	});

	router.post("/user/mute", function(req, res){
		var params = {
			userId: req.query.userId
		};

		sv.userService.muteUser(params).then(function(serviceResponse){
			res.send(serviceResponse);
		}, function(err){
			console.log('Se ha producido un error inesperado');
			res.send([]);
		})
	});

	router.post("/auth/facebook", function(req, res){
		var params = {
			provider: req.params.provider,
			userId: req.query.userId
		};

		sv.userService.userLogin(params).then(function(serviceResponse){
			res.send(serviceResponse);
		}, function(err){
			console.log('Se ha producido un error inesperado');
			res.send([]);
		})
	});


	router.post('/auth/twitter', function(req, res) {

		console.log(req.body);

		var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
		var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
		var profileUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=';

		// Part 1 of 2: Initial request from Satellizer.
		if (!req.body.oauth_token || !req.body.oauth_verifier) {
			var requestTokenOauth = {
				consumer_key: config.twitter.consumerKey,
				consumer_secret: config.twitter.consumerSecret,
				callback: req.body.redirectUri
			};

			// Step 1. Obtain request token for the authorization popup.
			request.post({ url: requestTokenUrl, oauth: requestTokenOauth }, function(err, response, body) {
				var oauthToken = qs.parse(body);

				// Step 2. Send OAuth token back to open the authorization screen.
				res.send(oauthToken);
			});
		} else {
			// Part 2 of 2: Second request after Authorize app is clicked.
			var accessTokenOauth = {
				consumer_key: config.twitter.consumerKey,
				consumer_secret: config.twitter.consumerSecret,
				token: req.body.oauth_token,
				verifier: req.body.oauth_verifier
			};

			// Step 3. Exchange oauth token and oauth verifier for access token.
			request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, response, accessToken) {

				accessToken = qs.parse(accessToken);
				res.send(accessToken);

				//var profileOauth = {
				//	consumer_key: config.twitter.consumerKey,
				//	consumer_secret: config.twitter.consumerSecret,
				//	oauth_token: accessToken.oauth_token
				//};
				//
				//// Step 4. Retrieve profile information about the current user.
				//request.get({
				//	url: profileUrl + accessToken.screen_name,
				//	oauth: profileOauth,
				//	json: true
				//}, function(err, response, profile) {
				//
				//	// Step 5a. Link user accounts.
				//	if (req.headers.authorization) {
				//		User.findOne({ twitter: profile.id }, function(err, existingUser) {
				//			if (existingUser) {
				//				return res.status(409).send({ message: 'There is already a Twitter account that belongs to you' });
				//			}
				//
				//			var token = req.headers.authorization.split(' ')[1];
				//			var payload = jwt.decode(token, config.TOKEN_SECRET);
				//
				//			User.findById(payload.sub, function(err, user) {
				//				if (!user) {
				//					return res.status(400).send({ message: 'User not found' });
				//				}
				//
				//				user.twitter = profile.id;
				//				user.displayName = user.displayName || profile.name;
				//				user.picture = user.picture || profile.profile_image_url.replace('_normal', '');
				//				user.save(function(err) {
				//					res.send({ token: createJWT(user) });
				//				});
				//			});
				//		});
				//	} else {
				//		// Step 5b. Create a new user account or return an existing one.
				//		User.findOne({ twitter: profile.id }, function(err, existingUser) {
				//			if (existingUser) {
				//				return res.send({ token: createJWT(existingUser) });
				//			}
				//
				//			var user = new User();
				//			user.twitter = profile.id;
				//			user.displayName = profile.name;
				//			user.picture = profile.profile_image_url.replace('_normal', '');
				//			user.save(function() {
				//				res.send({ token: createJWT(user) });
				//			});
				//		});
				//	}
				//});
			});
		}
	});

};

module.exports = controller;