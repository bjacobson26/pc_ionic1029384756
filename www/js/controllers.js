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

  $scope.yays = 0;
  $scope.nays = 0;

  $scope.viewLink = function(url, link_type) {
    if (ionic.Platform.isAndroid()) {
      if (link_type !== undefined && link_type !== null) {
        if (link_type.toLowerCase() !== 'html') {
          url = 'https://docs.google.com/viewer?url=' + encodeURIComponent(url);
        }
      }
    }
      var ref = window.open(url, '_blank', 'location=no');
  };

  // Congress.getAllLegislators();
  // Congress.getLegislatorByZipcode('90049');
  // Congress.getLegislatorByLastName('Sanders');
  // Congress.getCongressionalDistrict('90210'); 

  $scope.singleBillView = false;

  Congress.getRecentActiveBills().then(function(data){
    $scope.bills = data;
  });

  var userVote = 'undecided';

  $scope.upvote = function(){
    if(userVote == 'undecided' || userVote == 'nay'){ 
      if(userVote == 'nay'){
        $scope.nays--;
      };
      userVote = 'yay';
      $scope.yays++;
      document.getElementById('upvote').className = 'ion-thumbsup vote-button blue';
      document.getElementById('downvote').className = 'ion-thumbsdown vote-button';
    }
    else {
      $scope.yays--;
      userVote = 'undecided';
      document.getElementById('upvote').className = 'ion-thumbsup vote-button';
    }
    console.log(userVote);
  };

  $scope.downvote = function(){
    if(userVote == 'undecided' || userVote == 'yay'){
      if(userVote == 'yay'){
        $scope.yays--;
      }
      userVote = 'nay';
      $scope.nays++;
      document.getElementById('downvote').className = 'ion-thumbsdown vote-button red'
      document.getElementById('upvote').className = 'ion-thumbsup vote-button';
    }
    else {
      $scope.nays--;
      userVote = 'undecided';
      document.getElementById('downvote').className = 'ion-thumbsdown vote-button';
    }
    console.log(userVote);
  };
  
  $scope.viewBill = function(bill){
    $scope.singleBillView = true;
    $scope.singleBill = bill;
    console.log($scope.singleBill);
  };


});


// app.service('Congress', function($http){


// });
