
var apikey = '316dc8594dd44a9591a291a7ee10e2ff';

angular.module('peoples_congress')

.service('Congress', function($http){

  this.getAllLegislators = function(){
    $http.get(
      'https://congress.api.sunlightfoundation.com/legislators?per_page=all&apikey=' + apikey
    ).then(function(resp) {
        data = resp.data;
        // console.log(data);
    })
  }

  this.getLegislatorByZipcode = function(zipcode) {
    $http.get(
      'https://congress.api.sunlightfoundation.com/legislators/locate?zip=' + zipcode + '&apikey=' + apikey
    ).then(function(resp) {
        data = resp.data;
        // console.log(data);
    })
  };

  this.getLegislatorByLastName = function(last_name) {
    $http.get(
      'https://congress.api.sunlightfoundation.com/legislators?query=' + last_name + '&apikey=' + apikey
    ).then(function(resp) {
        data = resp.data;
        // console.log(data);
    })
  };



});

  

