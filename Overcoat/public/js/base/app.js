var sendNotificationMessage = function(site, coats) {
  var notification = {
    name: "updateNotifications",
    value: coats
  };
  
	parent.postMessage( notification, site );
};

var Overcoat = angular.module('Overcoat', ['satellizer']).config(function($authProvider) {

	$authProvider.facebook({
		clientId: '1477347859261626',
		url: '/auth/facebook',
		scope: ['email'],
		scopeDelimiter: ',',
		display: 'popup',
		type: '2.0',
		popupOptions: { width: 580, height: 400 }
	});

	$authProvider.twitter({
		url: '/auth/twitter',
		authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
		redirectUri: window.location.origin + ':4000/auth/twitter',
		type: '1.0',
		popupOptions: { width: 495, height: 645 }
	});

	//$authProvider.google({
	//	clientId: 'Google Client ID'
	//});

});

Overcoat.controller('mainCtrl', ['$scope', '$http', '$auth', function($scope, $http, $auth){
  var _this = this;

	$scope.siteURI = originURI || undefined;

	/* -- Auth -- */
	$scope.authenticate = function(provider) {
		$auth.authenticate(provider).then(function(response) {
			$scope.getAccount(1);
		}).catch(function(response) {
				alert('Please login to continue');
		});
	};

  $scope.triggerPolling = function() {
	  var from = new Date().getTime();
	  $http.get('/site/new-coats?site=' + $scope.siteURI + '&from=' + from).then(function(serviceResponse){
		  var count = serviceResponse.data.count;
		  if ( count ) {
			  $scope.newCoats = $scope.newCoats ? $scope.newCoats + count : count;
			  if ( $scope.siteURI ) {
				  sendNotificationMessage($scope.siteURI, $scope.newCoats);
			  }
		  }
	  });
  };

	setInterval($scope.triggerPolling, 10000);

  resetUI();

	/* --- Feed --- */

  /**
   * Get coats
   */
  $scope.getCoats = function(filter) {
    resetUI();

    $scope.component = 'coats';
	  $scope.filter = filter || "active";
	  $scope.subSection = filter;
    $scope.loading = true;

	  _getCoats($scope);
  };

	/**
	 * Post coat
	 */
	$scope.postCoat = function(text) {
		if ( !text ) {
			alert('You must enter a text');
			return false;
		}

		$scope.coatText = text;

		var params = {
			userId: $scope.user.id,
			coatText: text
		};

		$http.post('/coats/post', params).then(function(serviceResponse){
			$scope.coats.unshift({
				id: $scope.coats.length + 1,
				userId: $scope.user.id,
				user: $scope.user,
				siteUri: $scope.site,
				message: $scope.coatText,
				upvotes: 0,
				downvotes: 0,
				tips: 0,
				shares: 0,
				picture: undefined
			});

			$scope.togglePostingBox();
		}, function(err){
			$scope.coats.unshift({
				id: $scope.coats.length + 1,
				userId: $scope.user.id,
				user: $scope.user,
				siteId: 1,
				message: $scope.coatText,
				upvotes: 0,
				downvotes: 0,
				tips: 0,
				shares: 0,
				picture: undefined
			});

			$scope.togglePostingBox();
		});
	};

	/**
	 * Delete coat
	 */
	$scope.deleteCoat = function(coatId) {
		if ( confirm('Sure?') ) {
			$http.delete('/coats/delete', {coatId: coatId}).then(function(response){
				var coat = $scope.coats.filter(function(e) {
					if ( e.id == coatId ) {
						var index = $scope.coats.indexOf(e);
						if ( index != -1 ) {
							$scope.coats.splice(index, 1);
						}
					}
					return e.id == coatId
				});
			}, function(err){

			});
		}
	};

	/**
	 * Post reply
	 */
	$scope.postReply = function(entity, text) {
		if ( !text ) {
			alert('You must enter a text');
			return false;
		}

		$scope.replyText = text;

		var params = {
			userId: $scope.user.id,
			replyText: text
		};

		$http.post('/replies/post', params).then(function(serviceResponse){
			entity.replies = entity.replies || [];
			entity.replies.unshift({
				id: Math.floor((Math.random() * 9999) + 1),
				coatId: entity.id,
				user: $scope.user,
				siteUrl: $scope.siteURI,
				message: $scope.replyText,
				upvotes: 0,
				downvotes: 0,
				tips: 0,
				shares: 0,
				picture: undefined,
				replies: []
			});

			$scope.toggleReplyBox(entity);
		});
	};

	/**
	 * Delete reply
	 */
	$scope.deleteReply = function(replyId, parent) {
		if ( confirm('Sure?') ) {
			$http.delete('/replies/delete', {replyId: replyId}).then(function(res){
				var reply = parent.replies.filter(function(e) {
					if ( e.id == replyId ) {
						var index = parent.replies.indexOf(e);
						if ( index != -1 ) {
							parent.replies.splice(index, 1);
						}
					}
					return e.id == replyId
				});
			}, function(err){

			});
		}
	};

	/**
	 * Report User
	 */
	$scope.reportUser = function(userId) {
		if ( confirm('Sure?') ) {
			$http.post('/user/report', {userId: userId}).then(function(res){
				alert('User was reported');
			}, function(err){

			});
		}
	};

	/**
	 * Mute User
	 */
	$scope.muteUser = function(userId) {
		if ( confirm('Sure?') ) {
			$http.post('/user/mute', {userId: userId}).then(function(res){
				alert('User was muted');
			}, function(err){

			});
		}
	};

	/**
	 * Toggle boxes
	 */
	$scope.toggleReplyBox = function(entity, type) {
		var entityType = type || entity.type;
		$scope.showPostReply[entityType + '-' + entity.id] = !$scope.showPostReply[entityType + '-' + entity.id];
		$scope.replyText = '';
	};

	$scope.togglePostingBox = function() {
		$scope.showPostingBox = !$scope.showPostingBox;
		$scope.coatText = '';
	};

	/**
	 * Coat actions
	 */
	$scope.upvote = function(entity) {
		$http.post('/upvote', {entity: entity}).then(function(res){
			entity.upvotes++;
		});
	};

	$scope.downvote = function(entity) {
		$http.post('/downvote', {entity: entity}).then(function(res){
			entity.downvotes++;
		});
	};

	$scope.tip = function(entity) {
		$http.post('/tip', {entity: entity}).then(function(res){
			entity.tips++;
		});
	};

	$scope.follow = function(entity) {
		$http.post('/follow', {entity: entity}).then(function(res){
			entity.user.isFriend = true;
		});
	};

	$scope.unfollow = function(entity) {
		$http.post('/unfollow', {entity: entity}).then(function(res){
			entity.user.isFriend = false;
		});
	};

  /**
   * Get activity
   */
  $scope.getActivity = function() {
    resetUI();
    $scope.component = 'activity';
    $scope.loading = true;
    $http.get('/activity').success(function(notificationsRes){
      $scope.loading = false;
      $scope.notifications = notificationsRes;
	    $scope.noNotifications = $scope.notifications.length ? false : true;
    });

	  $http.get('/invitations').success(function(invitationRes){
		  $scope.invitations = invitationRes;
	  });
  };

	/**
	 * Discover section
	 */
	$scope.getDiscover = function(filter) {
		resetUI();
		$scope.component = 'discover';
		$scope.filter = filter || "hotSites";
		$scope.subSection = filter;

		$http.get('/discover?filter=' + $scope.filter).success(function(res){
			if ( $scope.filter == 'hotSites' || $scope.filter == 'newSites') {
				$scope.sites = res;
			}
			if ( $scope.filter == 'hotCoats' ) {
				$scope.coats = res;
			}
			if ( $scope.filter == 'topCoaters') {
				$scope.coaters = res;
			}
		});
	};

  /**
   * Get selected coat posts
   */
  $scope.getAccount = function(userId, cb) {
    resetUI();
    $http.get('/account/' + userId).success(function(userService){
      $scope.isLogged = true;
      $scope.hideMenu = true;
      $scope.user = userService;
      if (cb) cb();
      $scope.getCoats();
    });
  };

  /**
   * Show/Hide searchbox
   */
  $scope.toggleSearchbox = function(filter) {

	  if ( !filter && $scope.component == 'search' ) {

		  $scope.getCoats();
		  return;
	  }

	  if ( !filter ) {
		  $scope.hideMenu = !$scope.hideMenu;
	  }

    $scope.component = 'search';
	  $scope.subSection = filter || 'site';
	  $scope.toggleSubmenu('Search');
	  _getCoats($scope);
	  //$scope.getCoats();
  };

  /**
   * Show/Hide account
   */
  $scope.toggleAccount = function() {
    $scope.component = ($scope.component != 'account') ? 'account' : 'coats';

    if ( $scope.component == 'account' ) {
      $scope.showSearchbox = false;
      $scope.hideMenu = !$scope.hideMenu;
      $scope.showAccount = !$scope.showAccount;
    } else {
      $scope.getCoats();
    }
  };

  $scope.acceptInvitation = function(invitation) {
	  $http.get('/invitations/accept').success(function(invitationRes){
		  $scope.invitations.filter(function(e) {
			  if ( e.userID == invitation.userID ) {
				  var index = $scope.invitations.indexOf(e);
				  if ( index != -1 ) {
					  $scope.invitations.splice(index, 1);
				  }
			  }
			  return e.userID == invitation.userID
		  });
	  });
  };

  $scope.ignoreInvitation = function(invitation) {
	  $http.get('/invitations/reject').success(function(invitationRes){
		  $scope.invitations.filter(function(e) {
			  if ( e.userID == invitation.userID ) {
				  var index = $scope.invitations.indexOf(e);
				  if ( index != -1 ) {
					  $scope.invitations.splice(index, 1);
				  }
			  }
			  return e.userID == invitation.userID
		  });
	  });
  };


  /**
   * -- Helpers
   *
   */

  $scope.setEntity = function(entity, type) {
	  $scope.entity = entity;
	  $scope.entity.type = type;
  };

  $scope.setActivity = function(posts) {
    $scope.notifications = posts;
  };

  $scope.getView = function(type) {
    type = type + '.html';
    return type;
  };

  $scope.isActive = function(component) {
    return $scope.component == component;
  };

  $scope.isSubActive = function(subSection) {
    return $scope.subSection == subSection;
  };

  $scope.toggleSubmenu = function(section) {
    $scope.showSubmenu = ($scope.showSubmenu == section.toLowerCase()) ? '' : section.toLowerCase();
  };

  $scope.filterCoats = function(filter) {
    $scope.subSection = filter;
  };

  $scope.filterSearch = function(filter) {
    $scope.subSection = filter;
  };



  $scope.searchSubmit = function(searchText) {

    if (!searchText) {
      alert('really?');
      return false;
    }

    $scope.searchResults = [];
    $scope.searchText = searchText;

    $http.get('/search?q=' + searchText + '&type=' + $scope.subSection).then(function(res){
      $scope.searchResults.push({
        id: 1,
        name: $scope.searchText
      });
    }, function(err){

    });
  };

  $scope.toggleInviteModal = function() {
    $scope.modal = $scope.modal ? '' : 'invite';
  };

  $scope.isFriend = function(friendId) {
    $scope.friends = [2,3];
    return ( $scope.friends.indexOf(friendId) != -1 ) ? true : false;
  };

  $scope.getFriends = function(cb) {
    $http.get('/user/friends').then(function(res){
      $scope.friends = res || [];
      //if ( cb ) cb();
    }, function(err){
      $scope.friends = [];
      //if ( cb ) cb();
    });
  };

	$scope.toggleTooltip = function(tooltipId) {
		$scope.tooltips[tooltipId] = $scope.tooltips[tooltipId] ? !$scope.tooltips[tooltipId] : true;
	};

	$scope.toggleShareTooltip = function(tooltipId) {
		$scope.shareTooltips[tooltipId] = $scope.shareTooltips[tooltipId] ? !$scope.shareTooltips[tooltipId] : true;
	};

	function _getCoats( $scope ) {
		$http.get('/coats/get-coats?site=' + $scope.siteURI + '&filter=' + $scope.filter).success(function(serviceResponse){
			$scope.loading = false;
			$scope.site = serviceResponse.site || {id: 1, name: $scope.siteURI};
			$scope.coats = serviceResponse.coats;
			$scope.noCoats = $scope.coats.length ? false : true;
			$scope.newCoats = 0;
			if ( $scope.siteURI ) {
				sendNotificationMessage($scope.siteURI, $scope.newCoats);
			}
		});
	}

  function resetUI() {
    $scope.modal = '';
    $scope.showSubmenu = '';
    $scope.hideMenu = false;
    $scope.showAccount = false;
    $scope.showPostingBox = false;
    $scope.showSearchbox = false;
    $scope.inviteModal = false;
    $scope.noCoats = false;
    $scope.site = [];
    $scope.coats = [];
    $scope.tooltips = [];
    $scope.shareTooltips = [];
    $scope.searchResults = [];
    $scope.showPostReply = [];
	  // Discover
	  $scope.sites = [];
	  $scope.coaters = [];
  }
}]);

Overcoat.filter('siteName', function(){
	return function (uri) {
		var l;
		if ( uri ) {
			l = document.createElement("a");
			l.href = uri;
		} else {
			l = window.location;
		}

		l = l.hostname + (l.pathname || '');

		if(l.substr(-1) === '/') {
			return l.substr(0, l.length - 1);
		}
		return l;

	}
});
Overcoat.filter('abbrNum', function(){
	return function (number, decPlaces) {
		decPlaces = 2;
		// 2 decimal places => 100, 3 => 1000, etc
		decPlaces = Math.pow(10,decPlaces);

		// Enumerate number abbreviations
		var abbrev = [ "k", "m", "b", "t" ];

		// Go through the array backwards, so we do the largest first
		for (var i=abbrev.length-1; i>=0; i--) {

			// Convert array index to "1000", "1000000", etc
			var size = Math.pow(10,(i+1)*3);

			// If the number is bigger or equal do the abbreviation
			if(size <= number) {
				// Here, we multiply by decPlaces, round, and then divide by decPlaces.
				// This gives us nice rounding to a particular decimal place.
				number = Math.round(number*decPlaces/size)/decPlaces;

				// Handle special case where we round up to the next abbreviation
				if((number == 1000) && (i < abbrev.length - 1)) {
					number = 1;
					i++;
				}

				// Add the letter for the abbreviation
				number += abbrev[i];

				// We are done... stop
				break;
			}
		}

		return number;
	};
});