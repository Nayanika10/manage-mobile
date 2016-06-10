angular.module('uiGenApp')
  .controller('InterviewsController', function InterviewsController(QCONFIG, QuarcService, Restangular, $stateParams, $filter, moment,currentJob ) {
    const Page = QuarcService.Page;

    const vm = this;
    vm.job = currentJob;
    vm.buckets = QCONFIG.APPLICANT_STATES;
    Page.setTitle(`${vm.job.role} - ${$stateParams.status} Applicants`); // set page title

    vm.applicants = []; // collection of applicants
    vm.ui = {lazyLoad: true, loading: false}; // ui states
    vm.params = {
      offset: 0, limit: 15,
    }; // GET query params

    vm.loadApplicants = function loadApplicants() {
      if (!vm.ui.lazyLoad) return; // if no more jobs to get
      vm.ui = {lazyLoad: false, loading: true};

      Restangular
        .one('jobs', $stateParams.jobId)
        .all('references')
        .getList()
        .then(function applicantsList(result) {
          angular.forEach(result, function iterateApplicants(applicant) {
            vm.applicants.push(applicant);
          });

          // data has been loaded
          vm.ui.loading = false;

          // check for returned results count and set lazy loadLoad false if less
          vm.ui.lazyLoad = angular.equals(result.length, vm.params.limit) ? true : false;

          // increment offset for next loading of results
          vm.params.offset = vm.params.offset + vm.params.limit;
        });
    };

    vm.loadApplicants(); // get applicants

    // returns array containing resultkey of search result
    vm.getApplicants = function getApplicant(criteria = {}, returnkey = 'id') {
      return $filter('filter')(vm.applicants, criteria)
        .map(function checkedApplicant(applicant) {
          return applicant[returnkey];
        });
    };

    // sets value
    vm.setChecked = function setChecked(state) {
      angular.forEach(vm.applicants, function checked(value, key) {
        vm.applicants[key].checked = state;
      });
    };
  });
