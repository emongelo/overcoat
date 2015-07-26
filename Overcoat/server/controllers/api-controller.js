var _ = require('underscore');
var sv = require('../services/index');

/**
 * Async controller
 * @param router
 */
var apiController = function(router){

  /**
   * Get coats
   * @params.site
   * @query.limit
   */
  router.get('/coats/search/:site',function(req, res){
    // Get coats of current site

  });

  /**
   * Discover coats
   * @params.userId
   * @params.toUserId
   */
  router.post('/coats/discover',function(req, res){
    // Hot sites
    // New sites
    // Top coaters
    // Hot coats anywhere
  });


  /**
   * Get coat posts
   * @params.coatId
   * @query.limit
   */
  router.get('/posts/search/:coatId',function(req, res){
    // Get coat posts
  });

  /**
   * Get coat posts
   * @params.coatId
   * @query.limit
   */
  router.post('/posts/:coatId',function(req, res){
    // Create new coat
  });

  /**
   * Upvote post
   * @params.postId
   * @params.userId
   */
  router.post('/posts/upvote/:postId',function(req, res){
    // Upvote
  });

  /**
   * Downvote post
   * @params.postId
   * @query.userId
   */
  router.post('/posts/downvote/:postId',function(req, res){
    // Downvote
  });

  /**
   * Get coat posts
   * @params.postId
   * @params.message
   * @user
   */
  router.post('/posts/reply/:postId',function(req, res){
    // Reply
  });


  // Users --

  /**
   * Get user data
   * @params.userId
   */
  router.get('/users/detail/:userId',function(req, res){

    // Sanity check
    if (!req.params.userId) {
      handleError('user id not provided');
    }

    // Get user data
    var userId = req.params.userId;
    var user = sv.userService.getUser(userId);
    res.send(user);

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

