var app = angular.module('peoples_congress.controllers', [])
var USER_UPDATE_ENDPOINT = "https://test-pc-api.herokuapp.com/api/v1/users/"

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
    console.log("hey");
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
        console.log("Login resp: ");
        console.log(resp);
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

app.controller('HomeCtrl', function($rootScope, $scope, $http){

  $scope.showAccountInfo = false;

  $scope.toggleDob = function(){
    $scope.chooseDob = !$scope.chooseDob;
  };

  $scope.toggleAccountInfo = function(){
    $scope.showAccountInfo = !$scope.showAccountInfo;
  };
  $scope.toggleParty = function(){
    $scope.chooseParty = !$scope.chooseParty;
  };
  $scope.toggleGender = function(){
    $scope.chooseGender = !$scope.chooseGender;
  };

  $scope.saveUserInfo = function(currentUser){
    $scope.chooseDob = false;
    console.log(USER_UPDATE_ENDPOINT + currentUser.id);
    console.log("BEFORE");
    console.log(currentUser);
    console.log("AFTER");
    return $http.patch(USER_UPDATE_ENDPOINT + currentUser.id, currentUser).then(function(resp){
      console.log(resp);
      alert("Successfully Saved!");
    });
  };

});


app.controller('CongressCtrl', function($scope, $http, Congress) {

  Congress.getRecentActiveBills().then(function(resp){
    $scope.congressApiData = resp;
    for(i=0; i < resp.length; i++){
      getVoteData(resp[i]);
    };
  });

  var getVoteData = function(bill){
    $http.get(
      'http://localhost:3000/api/v1/bills/' + bill.id + '/votes')
      .then(function(resp){
        voteData = resp.data;
        makeBill(bill, voteData);
      })
  };

  var makeBill = function(bill, voteData){
    var bill = {
      'id': bill.id,
      'upvotes': voteData.total_upvotes,
      'downvotes': voteData.total_downvotes,
      'total_votes': voteData.total_votes,
      'description': bill.description,
      'title_without_number': bill.title_without_number,
      'district': bill.district,
      'bill_resolution_type': bill.bill_resolution_type,
      'bill_type_label': bill.bill_type_label,
      'congress': bill.congress,
      'current_status': bill.current_status,
      'current_status_date': bill.current_status_date,
      'current_status_description': bill.current_status_description,
      'current_status_label': bill.current_status_label,
      'display_number': bill.current_status_label,
      'introduced_date': bill.introduced_date,
      'enddate': bill.enddate,
      'is_alive': bill.is_alive,
      'is_current': bill.is_current,
      'link': bill.link,
      'noun': bill.noun,
      'number': bill.number,
      'senate_floor_schedule_postdate': bill.senate_floor_schedule_postdate,
      'source': bill.source,
      'source_link': bill.source_link,
      'sponsor': {
        'bioguideid': bill.sponsor.bioguideid,
        'birthday': bill.sponsor.birthday,
        'cspanid': bill.sponsor.cspanid,
        'firstname': bill.sponsor.firstname,
        'gender': bill.sponsor.gender,
        'gender_label': bill.sponsor.gender_label,
        'id': bill.sponsor.id,
        'lastname': bill.sponsor.lastname,
        'name': bill.sponsor.name,
        'osid': bill.sponsor.osid,
        'sortname': bill.sponsor.sortname,
        'twitterid': bill.sponsor.twitterid,
        'party': bill.sponsor_role.party,
        'role_type_label': bill.sponsor_role.role_type_label,
        'state': bill.sponsor_role.state,
        'title': bill.sponsor_role.title,
        'website': bill.sponsor_role.website,
        'phone': bill.sponsor_role.phone,
        'address': bill.sponsor_role.extra.address,
        'current': bill.sponsor_role.current
      }
    }
    console.log(bill);
    return bill
  };

});


