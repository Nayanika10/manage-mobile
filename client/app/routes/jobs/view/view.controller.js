angular.module('uiGenApp')
  .controller('JobViewController',
    function JobViewCtrl(QuarcService, Restangular, $stateParams, $sce, QCONFIG, currentJob) {
      const Jobs = QuarcService.Jobs;
      const Page = QuarcService.Page;

      const vm = this;
      vm.job = currentJob || {};
      vm.buckets = QCONFIG.APPLICANT_STATES;
      vm.data = {};
      vm.loadJob = function loadJob() {
        vm.ui = { loading: true };
        Page.setTitle(`${vm.job.role} - ${vm.job.client_name}`);
        vm.data = vm.job;
        vm.responsibility = $sce.trustAsHtml(vm.job.responsibility);
        vm.interview_addr = $sce.trustAsHtml(vm.job.interview_addr);
        vm.interview_place_direction = $sce.trustAsHtml(vm.job.interview_place_direction);

        // data has been loaded
        vm.ui.loading = false;

      };

      vm.loadJob();
    });
