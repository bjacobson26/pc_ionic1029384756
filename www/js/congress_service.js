
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
        // console.log(data);
    })
  }

  this.getLegislatorByZipcode = function(zipcode) {
    return $http.get(
      'https://congress.api.sunlightfoundation.com/legislators/locate?zip=' + zipcode + '&apikey=' + apikey
    ).then(function(resp) {
        data = resp.data;
        // console.log(data);
    })
  };

  this.getLegislatorByLastName = function(last_name) {
    return $http.get(
      'https://congress.api.sunlightfoundation.com/legislators?query=' + last_name + '&apikey=' + apikey
    ).then(function(resp) {
        data = resp.data;
        // console.log(data);
    })
  };

  this.getCongressionalDistrict = function(zipcode) {
    return $http.get(
      'https://congress.api.sunlightfoundation.com/districts/locate?zip=' + zipcode + '&apikey=' + apikey
    ).then(function(resp) {
        data = resp.data;
        //console.log(data);
    })
  };

  var loopThroughAndMakeBills = function(data){
    bills = [];
    for(i = 0; i < data.length; i++){
      bills.push(makeBill(data[i]));
    };
    return bills;
  }


  var makeBill = function(data){
   var bill = {
      'identifier': data.bill_id,
      'chamber': data.chamber.capitalize(),
      'introducedOn': data.introduced_on,
      'lastActionAt': data.last_action_at,
      'officialTitle': data.official_title,
      'shortTitle': data.short_title,
      'sponsor': data.sponsor.title + ". " + data.sponsor.first_name + " " + data.sponsor.last_name,
      'pdf': data.urls.pdf,
      'html': data.urls.html,
      'active': data.history.active,
      'awaitingSignature': data.history.awaiting_signature,
      'enacted': data.history.enacted,
      'housePassageResult': data.history.house_passage_result,
      'senatePassageResult': data.history.senate_passage_result,
      'vetoed': data.history.vetoed
    }
    return bill;
  };

  this.getRecentActiveBills = function(page){
    var page = page || 1;
    return $http.get(
      'https://congress.api.sunlightfoundation.com/bills?history.active=true&apikey=' + apikey + '&page=' + page
    ).then(function(resp) {
        var data = resp.data.results;
        var bills = loopThroughAndMakeBills(data);
        return bills

    })
  }



});

  

