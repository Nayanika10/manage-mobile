'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('access', {
        url: '/access',
        template: '<div ui-view class="fade-in-right-big smooth"></div>',
      })
      .state('access.oauth', {
        url: '/oauth',
        templateUrl: 'app/routes/access/oauth/oauth.html',
        controller: 'oAuthCtrl',
        controllerAs: 'oAuth'
      })
      .state('access.404', {
        url: '/404',
        templateUrl: 'app/routes/access/404/404.html',
      });
  });
