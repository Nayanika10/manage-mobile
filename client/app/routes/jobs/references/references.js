'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('job.references', {
        abstract:true,
        url: '/references',
        template: '<div ui-view></div>',
        controller: function($state){
          return $state.go('job.references.list')
        }
      })
      .state('job.references.list', {
        url: '?status',
        templateUrl: 'app/routes/jobs/references/list/list.html',
        controller: 'JobsReferencesListController',
        controllerAs: 'JobsReferencesList',
        resolve:{
          currentJob: function(QResolve,$stateParams){ return QResolve.currentJob($stateParams.jobId,{ fl: 'id' }) }
        }
      })

      .state('job.reference', {
        abstract:true,
        url: '/references/:referenceId',
        template: '<div ui-view></div>',
        resolve:{
          currentJob: function(QResolve,$stateParams){ return QResolve.currentJob($stateParams.jobId,{ fl: 'id' }); }
        }
      })
      .state('job.reference.view', {
        url: '',
        templateUrl: 'app/routes/jobs/references/view/view.html',
        controller: 'JobReferenceViewController',
        controllerAs: 'JobsReferenceView',
        resolve:{
          currentJob: function(QResolve,$stateParams){ return QResolve.currentJob($stateParams.jobId,{ fl: 'id' }); }
        }
      });
  });
