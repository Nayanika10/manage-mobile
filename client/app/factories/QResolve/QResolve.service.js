'use strict';

angular.module('uiGenApp')
  .factory('QResolve', function (Restangular) {
    return {
      currentJob: function (jobId,params) {
        var params = params || {};

        // if only requesting id then provide an restangular object with id
        if(params.fl){
          if(params.fl.split().length==1 &&~params.fl.split().indexOf('id')){
            return Restangular
              .one('jobs',jobId)
          }
        }
        // else getting data from server
        return Restangular
          .one('jobs',jobId).get(params)
          .then(function(job){ return job; })
          .catch(function(){ return console.log("Error while get job details"); })
      }
    };
  });
