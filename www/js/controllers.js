var app = angular.module('peoples_congress.controllers', [])

app.controller('AppCtrl', function($scope, $ionicModal, $timeout, $auth, $state, $rootScope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.authUser = function(){
    console.log($auth.validateUser());
  }

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.signUp = false;
  $scope.registrationForm = {};


  $scope.handleRegBtnClick = function() {
    $auth.submitRegistration($scope.registrationForm)
      .then(function(resp) {
        // handle success response
        console.log("SUCCESS");
        $scope.loginData = { 'email': $scope.registrationForm.email, 'password': $scope.registrationForm.password };
        $scope.doLogin();
      })
      .catch(function(resp) {
        // handle error response
        console.log("ERROR:");
        console.log(resp);
      });
  };
  // Perform the login action when the user submits the login form
  $scope.loginData = {};
  $scope.doLogin = function() {

    $auth.submitLogin($scope.loginData)
      .then(function(resp){
        $rootScope.currentUser = resp;
        $scope.closeLogin();
        $state.go('app.home');
      })
      .catch(function(resp){
        console.log(resp);
      });
  };
  $scope.logout = function() {
    $auth.signOut();
    $rootScope.currentUser = null;
    $state.go('app.browse')
  };

});

app.controller('HomeCtrl', function($scope){

});


app.controller('CongressCtrl', function($scope, Congress) {

  $scope.doRefresh = function() {
    Congress.getRecentActiveBills().then(function(data){
      $scope.bills = data;
    }).finally(function(){
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  var commentScore = 'undecided';


  var toggleUpvote = function(comment, commentScore){
    thumbsUpId = 'like_button_' + comment.id
    thumbsDownId = 'unlike_button_' + comment.id
    thumbsup = document.getElementById(thumbsUpId);
    thumbsdown = document.getElementById(thumbsDownId);
    if(thumbsup.style.color != "blue" && thumbsdown.style.color != "red"){
      comment.likes++;
      thumbsup.style.color = "blue";
      thumbsdown.style.color = "black";
    }
    else if(thumbsup.style.color == "blue"){
      comment.likes--;
      thumbsup.style.color = "black";
    }
    if(thumbsup.style.color != "blue" && thumbsdown.style.color == "red"){
      comment.likes++;
      comment.dislikes--;
      thumbsup.style.color = "blue";
      thumbsdown.style.color = "black";
    }
  }

  var toggleDownvote = function(comment){
    thumbsUpId = 'like_button_' + comment.id
    thumbsDownId = 'unlike_button_' + comment.id
    thumbsup = document.getElementById(thumbsUpId);
    thumbsdown = document.getElementById(thumbsDownId);
    if(thumbsdown.style.color != "red" && thumbsup.style.color != "blue"){
      comment.dislikes++;
      thumbsdown.style.color = "red";
      thumbsup.style.color = "black";
    }
    else if(thumbsdown.style.color == "red"){
      comment.dislikes--;
      thumbsdown.style.color = "black";
    }
    if(thumbsdown.style.color != "red" && thumbsup.style.color == "blue"){
      comment.likes--;
      comment.dislikes++;
      thumbsup.style.color = "black";
      thumbsdown.style.color = "red";
    }
  }

  $scope.giveStar = function(comment){
    starid = 'star_' + comment.id
    star = document.getElementById(starid);
    if(star.style.color == "gold"){
      comment.stars--;
      star.style.color = "black";
      star.style.background =  "";
    }
    else {
      guilded = true;
      comment.stars++;
      star.style.color = "gold";
    }


  }

  $scope.likeComment = function(comment){
    toggleUpvote(comment);
  }

  $scope.unlikeComment = function(comment){
    toggleDownvote(comment, commentScore);
  }
  
  $scope.viewComments = false;
  $scope.comments = [
    { 
      'id': '1',
      'user': 'XxPoopsBaldEaglezxX', 
      'text': "We worship an awesome God in the Blue States, and we don't like federal agents poking around in our libraries in the Red States. Now, I don't believe that Senator McCain doesn't care what's going on in the lives of Americans. You're on your own. You can't truly stand up for Georgia when you've strained our oldest alliances. The fear and anger that it provoked was understandable, but in some cases, it led us to act contrary to our ideals. All these things must be done in partnership.",
      'likes': 3640,
      'dislikes': 3253,
      'stars': 0
    },
    {
      'id': '2',
      'user': 'LiberalCat', 
      'text': "The hope of a skinny kid with a funny name who believes that America has a place for him, too. Hope in the face of difficulty. They weren't simply a religious leader's effort to speak out against perceived injustice. What the nay-sayers don't understand is that this election has never been about me. Tomorrow, I will visit Buchenwald, which was part of a network of camps where Jews were enslaved, tortured, shot and gassed to death by the Third Reich.",
      'likes': 245,
      'dislikes': 6432,
      'stars': 0
    },

    { 
      'id': '3',
      'user': 'BernieSandersOffical', 
      'text': "You've got the top 400 Americans owning more wealth than the bottom 150 million Americans. Most folks do not think that is right.",
      'likes': '98999',
      'dislikes': 3,
      'stars': 13
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
