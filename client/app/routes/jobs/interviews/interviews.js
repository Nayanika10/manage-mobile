/**
 * Created by Manjesh on 23-03-2016.
 */
'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('job.interviews', {
        abstract: true,
        url: '/interviews',
        template: '<div ui-view></div>',
        resolve:{
          currentJob: function(QResolve,$stateParams){ return QResolve.currentJob($stateParams.jobId,{ fl: 'id' }); }
        }
      })
      .state('job.interviews.list', {
        url: '?status',
        templateUrl: 'app/routes/jobs/interviews/list/list.html',
        controller: 'InterviewsListController',
        controllerAs: 'InterviewsList',
        resolve:{
          currentJob: function(QResolve,$stateParams){ return QResolve.currentJob($stateParams.jobId,{ fl: 'id' }); }
        }
      })

  });
