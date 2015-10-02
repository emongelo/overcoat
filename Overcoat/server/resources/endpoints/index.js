var config = require('../../config/config');

module.exports = {
  search: {
    method: 'get',
    path: config.api.basePath + '/search/:query'
  },
  unfollow: {
    method: 'delete',
    path: config.api.basePath + '/unfollow'
  },
  follow: {
    method: 'put',
    path: config.api.basePath + '/follow'
  },
  getAccount : {
    method: 'get',
    path: config.api.basePath + '/getAccount'
  },
  getNotifications: {
    method: 'get',
    path: config.api.basePath + '/getNotifications'
  },
  getDiscover: {
    method: 'get',
    path: config.api.basePath + '/getDiscover'
  },
  getCoats: {
    method: 'get',
    path: config.api.basePath + '/getCoats'
  },
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
  postCoat: {
    method: 'post',
    path: config.api.basePath + '/postCoat'
  },
  deleteCoat: {
    method: 'delete',
    path: config.api.basePath + '/deleteCoat'
  },
	getSite: {
		method: 'get',
		path: config.api.basePath + '/site'
	},
	getUser: {
		method: 'get',
		path: config.api.basePath + '/user/:userId'
	},
  getFriends: {
    method: 'get',
    path: config.api.basePath + '/user/friends'
  }
};