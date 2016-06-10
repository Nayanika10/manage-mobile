angular.module('uiGenApp')
  .controller('SocialShareController', function SocialShareController($uibModalInstance, currentJob, Restangular,User) {
    const vm = this;
    vm.job  = currentJob;
    vm.jobCode = currentJob.job_code
    vm.userIdBase64 = btoa(User.userinfo.id)
    vm.ok = function ok() {

    };

    vm.cancel = function cancel() {
      $uibModalInstance.dismiss('cancel');
    };
  });
