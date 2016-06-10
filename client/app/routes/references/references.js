'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('references', {
        abstract: true,
        url: '/references',
        template: '<div ui-view></div>',
      })
      .state('references.list', {
        url: '',
        templateUrl: 'app/routes/references/list/list.html',
        controller: 'ReferencesListController',
        controllerAs: 'ReferencesList'
      });
  });
