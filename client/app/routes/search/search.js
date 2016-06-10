'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search',
        templateUrl: 'app/routes/search/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'Search'
      });
  });
