'use strict';

angular.module('uiGenApp')
  .controller('oAuthCtrl', function (Auth, $location, $window, $state,URLS) {
    const vm = this;
    const query = $location.search();
    if (query.error) {
      vm.authErr = {
        error: query.error,
        error_description: query.error_description,
        code: query.code,
      };
      return;
    }

    if (query.code) {
      Auth.login({ code: query.code }).then(() => {
        Auth.setSessionData().then(() => {
          $window.location.href = $state
            .href(
              'app.applicants', { status: 'All' }, { absolute: true }
            );
        });
      }).catch((err) =>{
          // Todo: If Code expired Redirecting to OAuth Server Login Back.  It Might create a redirect loop
          console.log("Code Expired");
          $window.location.href = URLS.OAUTH;
      });

      return;
    }

    $state.go('app.applicants');
  });
