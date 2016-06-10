angular.module('uiGenApp')
  .controller('JobReferenceViewController', function ApplicantViewCtrl(QuarcService, Restangular, $stateParams, URLS, $sce, Page, Session, $state) {
      //Page = QuarcService.Page;
      //Session = QuarcService.Session;

      const vm = this;
      vm.data = {};
      vm.trustSrc = function trustSrc(src) {
        return $sce.trustAsResourceUrl(src);
      };

      vm.resumeSrc = `${URLS.QUARC_API}/jobs/${$stateParams.jobId}/references/${$stateParams.referenceId}/getResume?access_token=${Session.getAccessToken()}`;
      vm.loadApplicant = function loadApplicant() {
        vm.ui = { loading: true };
        Restangular
          .one('jobs',$stateParams.jobId)
          .one('references',$stateParams.referenceId)
          .get()
          .then(function gotApplicant(result) {
            vm.data = result;

            Page.setTitle(vm.data.name);

            // Loading Followers
            //Restangular
            //  .one('applicants',$stateParams.referenceId)
            //  .all('followers')
            //  .getList()
            //  .then(function gotFollower(fresult) {
            //    vm.data.follower = fresult;
            //  });

            // data has been loaded
            vm.ui.loading = false;
          });
      };

      vm.loadApplicant();

      vm.changeState = function(data){
        Restangular
          .one("jobs",$stateParams.jobId)
          .one('references',$stateParams.referenceId)
          .all('accept')
          .post(data)
          .then(response => {
            vm.data.approval_status = response.approval_status
            if(response.id){
              return setTimeout(function(){
                $state.go('applicant.view', { applicantId: response.id })
              },1000);
            }
          }).catch(err => {
           console.log("Error while making reference accept/reject")
        })

      }
    });
