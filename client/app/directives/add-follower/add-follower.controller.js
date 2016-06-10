angular.module('uiGenApp')
  .controller('AddFollowerController', function AddFollowerCtrl($uibModalInstance, FollowerData, ApplicantId, Restangular) {
    const vm = this;
    vm.FollowerData = FollowerData;
    vm.ApplicantId = ApplicantId;
    vm.newEmails = [];
    vm.addNewFollower = function addNewFollower() {
      const curVal = vm.emailTobeAdded;

      const found = vm.FollowerData.some(function alreadyExist(el) {
        return el.email_id === curVal;
      });

      const foundNew = vm.newEmails.some(function alreadyAdded(el) {
        return el === curVal;
      });

      if (!found || !foundNew) vm.newEmails.push(curVal);
    };

    vm.ok = function ok() {
      Restangular
        .one('applicants',vm.ApplicantId)
        .all('followers')
        .post(vm.newEmails)
        .then(function addedFollower() {
          $uibModalInstance.close(true);
        });
    };

    vm.cancel = function cancel() {
      $uibModalInstance.dismiss('cancel');
    };
  });
