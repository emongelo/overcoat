var mocks = require('../resources/mocks/index');

/**
 * Async controller
 * @param router
 */
var apiController = function(router){

	/**
	 * Get site
	 * @params.site
	 * @query.limit
	 */
	router.get('/get-site',function(req, res){
		// Get site

	});

  /**
   * Get coats
   * @params.site
   * @query.limit
   */
  router.get('/coats/get-coats',function(req, res){
    // Get coats of current site
	  var siteUrl = req.query.siteUrl;
	  var coats = mocks.coats;

	  res.send(coats);
  });

	/**
	 * Post coat
	 */
	router.post('/coats/post',function(req, res){
		res.send({success: true});
	});

	/**
	 * Delete coat
	 */
	router.delete('/coats/delete',function(req, res){
		res.send({success: true});
	});

	/**
	 * Post reply
	 */
	router.post('/replies/post',function(req, res){
		res.send({success: true});
	});

	/**
	 * Delete reply
	 */
	router.delete('/replies/delete',function(req, res){
		res.send({success: true});
	});

	/**
	 * Upvote
	 */
	router.post('/upvote',function(req, res){
		res.send({success: true});
	});

	/**
	 * Downvote
	 */
	router.post('/downvote',function(req, res){
		res.send({success: true});
	});

	/**
	 * Tip
	 */
	router.post('/tip',function(req, res){
		res.send({success: true});
	});

	/**
	 * Follow
	 */
	router.post('/follow',function(req, res){
		res.send({success: true});
	});

	/**
	 * Unfollow
	 */
	router.post('/unfollow',function(req, res){
		res.send({success: true});
	});

	/**
	 * Notifications
	 */
	router.get('/notifications',function(req, res){
		var notifications = mocks.notifications;
		res.send(notifications);
	});
	// Invitations
	router.get('/invitations',function(req, res){
		var invitations = mocks.invitations;
		res.send(invitations);
	});
	// Accept invitations
	router.get('/invitations/accept',function(req, res){
		res.send({success: true});
	});
	// Reject invitations
	router.get('/invitations/reject',function(req, res){
		res.send({success: true});
	});

	/**
   * Discover
   */
  router.get('/discover',function(req, res){
	  var filter = req.query.filter;
	  var discover = mocks.discover[filter];
	  res.send(discover);
  });


  /**
   * Get coat posts
   * @params.coatId
   * @query.limit
   */
  router.get('/posts/search/:coatId',function(req, res){
    // Get coat posts
  });


  // Users --

  /**
   * Get user data
   * @params.userId
   */
  router.get('/user/:userId',function(req, res){
	  var arr = mocks.users;

	  var user = arr.filter(function(e){
		  return e.id == req.params.userId
	  });

	  res.send(user.shift());
  });

  /**
   * Follow user
   * @params.userId
   * @params.toUserId
   */
  router.post('/users/follow',function(req, res){
    // Follow user
  });

  /**
   * Unfollow user
   * @params.userId
   * @params.toUserId
   */
  router.post('/users/unfollow',function(req, res){
    // Unfollow user
  });

  /**
   * Invite friends
   * @params.userId
   * @params.email
   */
  router.post('/users/invite',function(req, res){
    // Invite friend and send mail
  });

  /**
   * User notifications
   * @params.userId
   */
  router.post('/users/notifications/:userId',function(req, res){
    // Invite friend and send mail
  });

  /**
   * Stop notifications
   * @params.userId
   * @params.toUserId
   */
  router.post('/users/notifications/stop',function(req, res){
    // Stop notifications
  });

};

module.exports = apiController;

