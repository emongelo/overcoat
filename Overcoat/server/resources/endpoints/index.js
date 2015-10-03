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
		method: 'delete',
		path: config.api.basePath + '/unfollow'
	},
	follow: {
		method: 'put',
		path: config.api.basePath + '/follow'
	},
	getFriends: {
		method: 'get',
		path: config.api.basePath + '/user/friends'
	},
	// Feed
	getCoats: {
		method: 'get',
		path: config.api.basePath + '/coats/get-coats?siteUrl=:siteUrl'
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
	tipCoat: {
		method: 'put',
		path: config.api.basePath + '/tipCoat'
	},
	shareCoat: {
		method: 'put',
		path: config.api.basePath + '/shareCoat'
	},
	downvoteCoat: {
		method: 'put',
		path: config.api.basePath + '/downvoteCoat'
	},
	upvoteCoat: {
		method: 'put',
		path: config.api.basePath + '/upvoteCoat'
	},

  search: {
    method: 'get',
    path: config.api.basePath + '/search/:query'
  },
  getNotifications: {
    method: 'get',
    path: config.api.basePath + '/getNotifications'
  },
  getDiscover: {
    method: 'get',
    path: config.api.basePath + '/getDiscover'
  }
};