'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scoreboard', {
        url: '/scoreboard',
        template: '<scoreboard></scoreboard>'
      });
  });
