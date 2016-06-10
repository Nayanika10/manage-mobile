'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      //  All Job - Routes
      .state('jobs', {
        abstract: true,
        url: '/jobs',
        template: '<div ui-view></div>',
      })
      .state('jobs.list', {
        url: '?status',
        templateUrl: 'app/routes/jobs/list/list.html',
        controller:'JobsListController',
        controllerAs: 'JobsList',
      })
      // One Job Routes
      .state('job', {
        abstract: true,
        url: '/jobs/:jobId',
        template: '<div ui-view></div>',
        controller: 'JobsCtrl',
        controllerAs: 'Jobs',
        resolve:{
          currentJob: function(QResolve,$stateParams){ return QResolve.currentJob($stateParams.jobId,{ fl: 'id' }); }
        }
      })
      .state('job.view', {
        url: '',
        templateUrl: 'app/routes/jobs/view/view.html',
        controller: 'JobViewController',
        controllerAs: 'JobView',
        resolve:{
          currentJob: function(QResolve,$stateParams){ return QResolve.currentJob($stateParams.jobId) }
        }
      })
  });


