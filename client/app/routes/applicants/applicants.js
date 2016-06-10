/**
 * LIST    /applicants             ->  ApplicantsCtrl
 * NEW     /applicants/new         ->  ApplicantNewController
 * VIEW    /applicants/:id         ->  ApplicantViewController
 */

'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('applicants', {
        abstract: true,
        url: '/applicants',
        template: '<div ui-view></div>'
      })
      .state('applicants.list', {
        url: '?status',
        templateUrl: 'app/routes/applicants/list/list.html',
        controller: 'ApplicantsListCtrl',
        controllerAs: 'ApplicantsList'
      })
      .state('applicant', {
        abstract: true,
        url: '/applicants/:applicantId',
        template: '<div ui-view></div>'
      })
      .state('applicant.view', {
        url: '',
        templateUrl: 'app/routes/applicants/view/view.html',
        controller: 'ApplicantViewController',
        controllerAs: 'ApplicantView'
      });
  });
