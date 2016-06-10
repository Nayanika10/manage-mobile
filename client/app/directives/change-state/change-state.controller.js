angular.module('uiGenApp')
  .controller('ChangeStateController', function ChangeStateCtrl($uibModalInstance, User, CURRENCY, applicant, Restangular, stateId, moment) {
      const vm = this;
      vm.states = User.states;
      vm.applicant = applicant;
      vm.stateId = stateId;
      vm.currency = CURRENCY;
      vm.today = new Date();
      vm.exData = {
        scheduled_on_time: moment()
          .startOf('day')
          .set('hour', 10),
      };

      vm.setScheduledOn = function scheduledOnTimeChange() {
        const hour = moment(vm.exData.scheduled_on_time).get('hour');
        const minute = moment(vm.exData.scheduled_on_time).get('minute');
        vm.data.scheduled_on = moment(vm.exData.scheduled_on_date)
          .set('hour', hour)
          .set('minute', minute);
      };
      vm.setScheduledOnmyDate = function () {
        const hour = moment(vm.exData.scheduled_on_time).get('hour');
        const minute = moment(vm.exData.scheduled_on_time).get('minute');
        vm.data.scheduled_on = moment(vm.exData.scheduled_on_date)
          .set('hour', hour)
          .set('minute', minute);
      };

      vm.ok = function ok() {
        Restangular.one('applicants',applicant.id).all('changeState').post(vm.data).then()
        //ChangeState.set(applicant.id, vm.data)
          .then(function handleChangeState(res) {
            $uibModalInstance.close(vm.data);
          })
          .catch(function handleFailure(response) {
            vm.changeStateError = response.error;
          });
      };

      vm.cancel = function cancel() {
        $uibModalInstance.dismiss('cancel');
      };
    });
