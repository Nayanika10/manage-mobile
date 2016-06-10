angular.module('uiGenApp')
  .controller('ApplicantCommentsController',
    function ApplicantCommentsController(QuarcService, $stateParams, Restangular) { //User
      const User = QuarcService.User;
      const vm = this;
      vm.loadApplicantComments = function loadApplicantComments() {
        vm.ui = { loading: true, scrollToBottom: false };
        Restangular
          .one('applicants',$stateParams.applicantId)
          .all('comments')
          .getList()
        //ApplicantComments
        //  .get($stateParams.applicantId)
          .then(function gotJobComment(result) {
            vm.data = result;

            // data has been loaded
            vm.ui = { loading: false, scrollToBottom: true };
          });
      };

      vm.insert = function insertComment() {
        const comment = vm.post.comment;
        vm.ui = { loading: true, scrollToBottom: false };
        Restangular
          .one('applicants',$stateParams.applicantId)
          .all('comments')
          .post({ comment: comment })
        //ApplicantComments
        //  .set($stateParams.applicantId, { comment: comment })
          .then(function insertedComment() {
            vm.post.comment = '';
            vm.data.push({
              user: { name: User.userinfo.name },
              body: comment,
              created_at: new Date().toISOString(),
            });

            // data has been loaded
            vm.ui = { loading: false, scrollToBottom: true };
          });
      };

      vm.loadApplicantComments();
    });
