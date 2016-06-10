'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('advanced-search', {
        url: '/advanced-search',
        templateUrl: 'app/routes/advanced-search/advanced-search.html',
        controller: 'AdvancedSearchCtrl',
        controllerAs: 'AdvancedSearch'
      });
  });
