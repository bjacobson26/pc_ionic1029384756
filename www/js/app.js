// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('peoples_congress', ['ionic', 'peoples_congress.controllers', 'ng-token-auth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {
 
  $authProvider.configure({
    apiUrl: 'https://test-pc-api.herokuapp.com'
  });


  $stateProvider

  .state('app', {
  url: '/app',
  abstract: true,
  templateUrl: './templates/menu.html',
  controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: './templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

   .state('app.login', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: './templates/login.html',
        controller: 'AppCtrl'
      }
    }
  })

  .state('app.browse', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: './templates/browse.html',
        controller: 'CongressCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app/browse');
});
