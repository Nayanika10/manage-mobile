'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search-results', {
        url: '/search-results?interview_time,eng_mgr_name_sf,client_name,consultant_username_sf,exp_location,eng_mgr_name,job_status,applicant_score,client_score,screening_score,consultant_score,updated_on,created_on,role,state_id',
        templateUrl: 'app/routes/search-results/search-results.html',
        controller: 'SearchResultsCtrl'
      });
  });

