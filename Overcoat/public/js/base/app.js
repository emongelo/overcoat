var Overcoat = angular.module('Overcoat', []);

Overcoat.controller('mainCtrl', ['$scope', '$http', function($scope, $http){
  _this = {};

  $scope.url = window.location.href;
  resetUI();

  /**
   * Login
   */
  $scope.signin = function(network) {
    _this.userId = 1;
    $scope.getAccount(_this.userId);
  };

  /**
   * Get coats for current site
   */
  $scope.getCoats = function() {
    resetUI();

    $scope.component = 'coats';
    $scope.loading = true;
    $http.get('/coats?site=' + $scope.url).success(function(serviceResponse){
      $scope.loading = false;
      $scope.site = serviceResponse.site;
      $scope.coats = serviceResponse.coats;
      $scope.noCoats = false;

      if ( !$scope.coats.length ) {
        $scope.noCoats = true;
      }

      if ( !$scope.site ) {
        $scope.site = {
          name: $scope.url
        };
      }

    });
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
  $scope.getAccount = function(userId) {
    resetUI();
    $http.get('/api/users/detail/' + userId + '?render=false').success(function(res){
      $scope.isLogged = true;
      $scope.hideMenu = true;
      $scope.user = res;
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

  $scope.toggleTooltip = function(tooltipId) {
    $scope.tooltips[tooltipId] = $scope.tooltips[tooltipId] ? !$scope.tooltips[tooltipId] : true;
  };

  $scope.toggleShareTooltip = function(tooltipId) {
    $scope.shareTooltips[tooltipId] = $scope.shareTooltips[tooltipId] ? !$scope.shareTooltips[tooltipId] : true;
  };

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
   * -- Helpers
   *
   */
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

  $scope.togglePostingBox = function() {
    $scope.showPostingBox = !$scope.showPostingBox;
  };

  $scope.toggleInviteModal = function() {
    $scope.modal = $scope.modal ? '' : 'invite';
  };

  $scope.isFriend = function(friendId) {
    $scope.friends = [1,2,3,4];
    return ( $scope.friends.indexOf(friendId) != -1 ) ? true : false;
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
    $scope.coats = [];
    $scope.newCoats = [];
    $scope.tooltips = [];
    $scope.shareTooltips = [];
  }
}]);