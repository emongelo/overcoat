var Overcoat = angular.module('Overcoat', []);

Overcoat.controller('mainCtrl', ['$scope', '$http', function($scope, $http, $sce, $compile){
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
    resetUI();
    $scope.component = 'search';
    $scope.showSearchbox = !$scope.showSearchbox;
  };

  /**
   * Show/Hide account
   */
  $scope.toggleAccount = function() {
    $scope.showSearchbox = false;
    $scope.showAccount = !$scope.showAccount;
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

  function resetUI(noReset) {
    $scope.showAccount = false;
    $scope.showPostingBox = false;
    $scope.showSearchbox = false;
    $scope.noCoats = false;
    $scope.site = [];
    $scope.coats = [];
    $scope.newCoats = [];
  }
}]);