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

  var commentScore = 'undecided';

  $scope.likeComment = function(comment){
    if(commentScore == 'undecided'){
      commentScore = 'upvote';
      comment.likes++;
      document.getElementById('like_comment').className += ' blue';
    }
    else if(commentScore == 'downvote'){
      commentScore = 'upvote';
      comment.likes++;
      comment.dislikes--;
      document.getElementById('like_comment').className += ' blue';
      document.getElementById('unlike_comment').className = 'button';
    }
    else if(commentScore == 'upvote'){
      commentScore = "undecided";
      comment.likes--;
      document.getElementById('like_comment').className = 'button';
    }
  }

  $scope.unlikeComment = function(comment){
    if(commentScore == 'undecided'){
      commentScore = 'downvote';
      comment.dislikes++;
      document.getElementById('unlike_comment').className += ' red';
    }
    else if(commentScore == 'downvote'){
      comment.dislikes--;
      commentScore = 'undecided';
      document.getElementById('unlike_comment').className = 'button';
    }
    else if(commentScore == 'upvote'){
      commentScore = 'downvote';
      comment.likes--;
      comment.dislikes++;
      document.getElementById('like_comment').className = 'button';
      document.getElementById('unlike_comment').className += ' red';
    }
  }
  
  $scope.viewComments = false;
  $scope.comments = [
    { 
      'user': 'XxPoopsBaldEaglezxX', 
      'text': "We worship an awesome God in the Blue States, and we don't like federal agents poking around in our libraries in the Red States. Now, I don't believe that Senator McCain doesn't care what's going on in the lives of Americans. You're on your own. You can't truly stand up for Georgia when you've strained our oldest alliances. The fear and anger that it provoked was understandable, but in some cases, it led us to act contrary to our ideals. All these things must be done in partnership.",
      'likes': 3640,
      'dislikes': 3253
    },
    {
      'user': 'LiberalCat', 
      'text': "The hope of a skinny kid with a funny name who believes that America has a place for him, too. Hope in the face of difficulty. They weren't simply a religious leader's effort to speak out against perceived injustice. What the nay-sayers don't understand is that this election has never been about me. Tomorrow, I will visit Buchenwald, which was part of a network of camps where Jews were enslaved, tortured, shot and gassed to death by the Third Reich.",
      'likes': 245,
      'dislikes': 6432
    },

    { 
      'user': 'BernieSandersOffical', 
      'text': "You've got the top 400 Americans owning more wealth than the bottom 150 million Americans. Most folks do not think that is right.",
      'likes': '98999',
      'dislikes': 3 
    }
  ];
  $scope.openComments = function(){
    if($scope.viewComments == false){
      $scope.viewComments = true;
    }
    else{
      $scope.viewComments = false;
    }
  }

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
