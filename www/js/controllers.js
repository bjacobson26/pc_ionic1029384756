var app = angular.module('peoples_congress.controllers', [])

app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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

});

app.controller('HomeCtrl', function($scope){

});

app.controller('CongressCtrl', function($scope, Congress) {
  // Congress.getAllLegislators();
  // Congress.getLegislatorByZipcode('90049');
  // Congress.getLegislatorByLastName('Sanders');
  // Congress.getCongressionalDistrict('90210'); 

  $scope.singleBillView = false;

  Congress.getRecentActiveBills().then(function(data){
    $scope.bills = data;
  });

  var vote = -1;

  $scope.upvote = function(){
    if(vote == -1 || vote == 0){ 
      vote = 1;
      document.getElementById('upvote').className = 'ion-thumbsup vote-button blue';
      document.getElementById('downvote').className = 'ion-thumbsdown vote-button';
    }
    else {
      vote = -1;
      document.getElementById('upvote').className = 'ion-thumbsup vote-button';
    }
  };

  $scope.downvote = function(){
    if(vote == -1 || vote == 1){ 
      vote = 0;
      document.getElementById('downvote').className = 'ion-thumbsdown vote-button red'
      document.getElementById('upvote').className = 'ion-thumbsup vote-button';
    }
    else {
      vote = -1;
      document.getElementById('downvote').className = 'ion-thumbsdown vote-button';
    }
  };
  
  $scope.viewBill = function(bill){
    $scope.singleBillView = true;
    $scope.singleBill = bill;
    console.log($scope.singleBill);
  };


});


// app.service('Congress', function($http){


// });
