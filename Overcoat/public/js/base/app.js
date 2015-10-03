var sendNotificationMessage = function(site) {
  var notification = {
    name: "updateNotifications",
    value: "35"
  };
  
	parent.postMessage( notification, site );
};

var Overcoat = angular.module('Overcoat', []);

Overcoat.controller('mainCtrl', ['$scope', '$http', function($scope, $http){
  var _this = this;

  $scope.url = window.location.href;
  sendNotificationMessage($scope.url);
  resetUI();

  /* -- Login -- */

  $scope.signin = function(network) {
    $scope.getAccount(1);
  };

	/* --- Feed --- */

  /**
   * Get coats
   */
  $scope.getCoats = function() {
    resetUI();

    $scope.component = 'coats';
    $scope.loading = true;
    $http.get('/coats/get-coats?site=' + $scope.url).success(function(serviceResponse){
      $scope.loading = false;
      $scope.site = serviceResponse.site || {id: 1, name: $scope.url};
      $scope.coats = serviceResponse.coats;
      $scope.noCoats = $scope.coats.length ? false : true;

    });
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

			entity.replies.unshift({
				id: Math.floor((Math.random() * 9999) + 1),
				coatId: entity.id,
				user: $scope.user,
				siteUrl: $scope.url,
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
	$scope.deleteReply = function(replyId) {
		if ( confirm('Sure?') ) {
			$http.delete('/reply/delete', {replyId: replyId}).then(function(res){
				var reply = $scope.coats.replies.filter(function(e) {
					if ( e.id == replyId ) {
						var index = $scope.coats.replies.indexOf(e);
						if ( index != -1 ) {
							$scope.coats.replies.splice(index, 1);
						}
					}
					return e.id == replyId
				});
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
	$scope.upvote = function(coatId) {
		alert('upvote coat ' + coatId);
	};

	$scope.downvote = function(coatId) {
		alert('downvote coat ' + coatId);
	};

	$scope.reply = function(coatId) {
		alert('reply coat ' + coatId);
	};

	$scope.tip = function(coatId) {
		alert('tip coat ' + coatId);
	};

	$scope.follow = function(userId) {
		alert('follow user ' + userId);
	};

  /**
   * Get activity
   */
  $scope.getActivity = function() {
    resetUI();
    $scope.component = 'activity';
    $scope.loading = true;
    $http.get('/activity').success(function(res){
      $scope.loading = false;
      $scope.notifications = res;
      $scope.noNotifications = false;

      if ( !$scope.notifications.length ) {
        $scope.noNotifications = true;
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
   * Discover section
   */
  $scope.getDiscover = function() {
    resetUI();
    $scope.component = 'discover';

    $http.get('/discover').success(function(res){
      $scope.discover = res;
    });
  };

  /**
   * Show/Hide searchbox
   */
  $scope.toggleSearchbox = function() {
    $scope.component = ($scope.component != 'search') ? 'search' : 'coats';
    $scope.hideMenu = !$scope.hideMenu;
    $scope.showSearchbox = !$scope.showSearchbox;
    $scope.toggleSubmenu('Search');
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



  $scope.acceptInvitation = function(userId) {
    alert('accept invitation for user ' + userId);
  };

  $scope.ignoreInvitation = function(userId) {
    alert('ignore invitation for user ' + userId);
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
    if ( section != 'Search' ) $scope['get' + section]();
    $scope.showSubmenu = ($scope.showSubmenu == section.toLowerCase()) ? '' : section.toLowerCase();
  };

  $scope.filterCoats = function(filter) {
    $scope.subSection = filter;
  };

  $scope.filterDiscover = function(filter) {
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
    $scope.coats = $scope.coats || [];
    $scope.newCoats = [];
    $scope.tooltips = [];
    $scope.shareTooltips = [];
    $scope.searchResults = [];
    $scope.showPostReply = [];
  }
}]);