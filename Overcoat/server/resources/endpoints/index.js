var config = require('../../config/config');

module.exports = {
	// User
	getUser: {
		method: 'get',
		path: config.api.basePath + '/user/:userId'
	},
	getAccount : {
		method: 'get',
		path: config.api.basePath + '/getAccount'
	},
	unfollow: {
		method: 'post',
		path: config.api.basePath + '/unfollow'
	},
	follow: {
		method: 'post',
		path: config.api.basePath + '/follow'
	},
	getFriends: {
		method: 'get',
		path: config.api.basePath + '/user/friends'
	},
	// Feed
	getCoats: {
		method: 'get',
		path: config.api.basePath + '/coats/get-coats?siteUrl=:siteUrl&filter=:filter'
	},
	postCoat: {
		method: 'post',
		path: config.api.basePath + '/coats/post'
	},
	deleteCoat: {
		method: 'delete',
		path: config.api.basePath + '/coats/delete'
	},
	postReply: {
		method: 'post',
		path: config.api.basePath + '/replies/post'
	},
	deleteReply: {
		method: 'delete',
		path: config.api.basePath + '/replies/delete'
	},
	// Actions
	tip: {
		method: 'post',
		path: config.api.basePath + '/tip'
	},
	downvote: {
		method: 'post',
		path: config.api.basePath + '/downvote'
	},
	upvote: {
		method: 'post',
		path: config.api.basePath + '/upvote'
	},

  search: {
    method: 'get',
    path: config.api.basePath + '/search/:query'
  },
	// Norifications
  getNotifications: {
    method: 'get',
    path: config.api.basePath + '/notifications'
  },
	// Discover
  getDiscover: {
    method: 'get',
    path: config.api.basePath + '/discover?filter=:filter'
  }
};