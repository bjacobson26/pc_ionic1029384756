
var apikey = '316dc8594dd44a9591a291a7ee10e2ff';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

angular.module('peoples_congress')

.service('Congress', function($http){

  this.getAllLegislators = function(){
    return $http.get(
      'https://congress.api.sunlightfoundation.com/legislators?per_page=all&apikey=' + apikey
    ).then(function(resp) {
        data = resp.data;
    })
  }

  this.getLegislatorByZipcode = function(zipcode) {
    return $http.get(
      'https://congress.api.sunlightfoundation.com/legislators/locate?zip=' + zipcode + '&apikey=' + apikey
    ).then(function(resp) {
        data = resp.data;
    })
  };

  this.getLegislatorByLastName = function(last_name) {
    return $http.get(
      'https://congress.api.sunlightfoundation.com/legislators?query=' + last_name + '&apikey=' + apikey
    ).then(function(resp) {
        data = resp.data;
    })
  };

  this.getCongressionalDistrict = function(zipcode) {
    return $http.get(
      'https://congress.api.sunlightfoundation.com/districts/locate?zip=' + zipcode + '&apikey=' + apikey
    ).then(function(resp) {
        data = resp.data;
    })
  };

  this.getRecentActiveBills = function(){
    return $http.get(
      'https://www.govtrack.us/api/v2/bill?congress=114&order_by=-current_status_date'
    ).then(function(resp) {
        console.log(resp.data.objects);
        return resp.data.objects;
    })
  }



});

  

