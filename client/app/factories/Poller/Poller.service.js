'use strict';

angular.module('uiGenApp')
  .factory('Poller', function(URLS, $http, $timeout) {
    var poller = function() {
      $http.get(URLS.QUARC_API+'/jobs/allocationStatusNewCount').then(function(r) {
        var object = { count : r.data.count, timestamp: new Date().getTime()}
        localStorage.setItem("Poller", JSON.stringify(object));
        $timeout(poller, 1000 * 60 *5);
      });
    };

    var object = JSON.parse(localStorage.getItem("Poller"));
    if (object) {
      var dateString = object.timestamp,
        now = new Date().getTime().toString();
      if ((dateString * 1000 * 60 * 0.1) >= now ) {
        //time out, send an ajax call
        poller()
        return false;
      }
      return object.response;
    } else {
      if ((dateString * 1000 * 60 * 1) >= now ) {
        //time out, send an ajax call
        poller()
        return false;
      }
    }

    return {
      getData: localStorage.Poller
    }
  });
