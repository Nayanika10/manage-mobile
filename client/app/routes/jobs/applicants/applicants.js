'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
    // /jobs/:jobId/applicants/new
      .state('job.applicants.new', {
        url: '/new',
        templateUrl: 'app/routes/jobs/applicants/new/new.html',
        controller: 'ApplicantNewController',
        controllerAs: 'ApplicantNew',
        resolve:{
          currentJob: function(QResolve,$stateParams){ return QResolve.currentJob($stateParams.jobId); }
        }
      })

      .state('job.applicants', {
        abstract: true,
        url: '/applicants',
        template: '<div ui-view></div>',
        resolve:{
          currentJob: function(QResolve,$stateParams){ return QResolve.currentJob($stateParams.jobId,{ fl: 'id,job_code' }); }
        }
      })
      .state('job.applicants.list', {
        url: '?status',
        templateUrl: 'app/routes/jobs/applicants/list/list.html',
        controller: 'JobsApplicantsListController',
        controllerAs: 'JobsApplicantsList',
        resolve:{
          currentJob: function(QResolve,$stateParams){ return QResolve.currentJob($stateParams.jobId,{ fl: 'id,job_code' }); }
        }
      })

  });
