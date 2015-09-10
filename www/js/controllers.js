(function(){
  'use strict';

  angular
    .module('starter.controllers', [])
    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:
      //$scope.$on('$ionicView.enter', function(e) {
      //});

      // Form data for the login modal
      $scope.loginData = {};

      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      // Triggered in the login modal to close it
      $scope.closeLogin = function() {
        $scope.modal.hide();
      };

      // Open the login modal
      $scope.login = function() {
        $scope.modal.show();
      };

      // Perform the login action when the user submits the login form
      $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
          $scope.closeLogin();
        }, 1000);
      };


    })
    .controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
      $scope.showMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
      };
    })
    .controller('FavTabCtrl', function($scope, $http) {
      function getSpots() {
        $http
          .get('http://localhost:8100/spots')
          .then(function(response) {
            $scope.all = response.data;
          });
      }
      getSpots();
    })
    .controller('SpotCtrl', function($scope, $http) {
      $scope.title = "Single Spot";

      function getOneSpot() {
        $http
          .get('http://localhost:8100/spots')
          .then(function(response) {
            var id = window.location.href.slice(window.location.href.lastIndexOf('/') +1);
            $scope.spot = response.data.filter(function(spot){
              return spot._id === id
            });
          });
      }

      getOneSpot();

    })
    .controller('MapCtrl', function() {

      function initMap() {
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 34.0500, lng: -118.2500},
          scrollwheel: false,
          zoom: 8
        });
      }

      initMap();
    })
    .controller('FriendsCtrl', function($scope, $http) {
      $scope.title = "Friends List";

      function getFriendsList() {
        $http
          .get('http://localhost:8100/users')
          .then(function(response) {
            $scope.all = response.data;
          })
      }

      getFriendsList();

    });




})();
