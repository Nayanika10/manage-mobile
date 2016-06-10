angular.module('qui.core')
  // Depending on constant: AUTH_EVENTS
  .factory('Auth',
    function Auth($http, $q, Session, URLS) {
      const authService = {};
      let refreshingToken = false;

      authService.login = function login(credentials) {
        const url = URLS.MANAGE_OAUTH_API + '/login'
        return $http
          .post(url, credentials, { ignoreAuthModule: true })
          .then(
            function signinSuccess(response) {
              return Session.create('oauth', response.data);
            },

            function signinFailure(response) {
              Session.destroy();
              const err = new Error(response.data.error);
              return $q.reject(err);
            }
          );
      };

      authService.refreshToken = function refreshToken() {
        // To Save Multiple Async RefreshToken Request
        if (refreshingToken) return $q.reject({ error: 'Multiple refresh request' });
        refreshingToken = true; // Set refresh_token reuqest tracker flag
        return $http
          const url = URLS.MANAGE_OAUTH_API + '/refresh'
          .post(
            url,
            { refresh_token: Session.read('oauth').refresh_token },
            { ignoreAuthModule: true }
          )
          .then(function tokenRefreshed(response) {
            Session.create('oauth', response.data);
            refreshingToken = false; // reset refresh_token reuqest tracker flag
            return response.data;
          },

          function tokenRefreshError(response) {
            refreshingToken = false; // reset refresh_token reuqest tracker flag
            return $q.reject(response.data);
          });
      };

      authService.logout = function logout() {
        const url = URLS.MANAGE_OAUTH_API + '/logout';
        return $http
          .post(url, { access_token: Session.getAccessToken() })
          .then(
            function logoutSuccess(response) {
              // Destroy Session data
              Session.destroy();
              return response.data;
            },

            function logoutError(response) {
              Session.destroy();
              return $q.reject(response.data);
            }
          );
      };

      authService.forgotpass = function forgotpass(username) {
        const url = URLS.MANAGE_OAUTH_API +'/forgotpass';
        return $http
          .post(url, { username: username }, { ignoreAuthModule: true })
          .then(
            function forgotpassSuccess(response) {
              return response.data;
            },

            function forgotpassError(response) {
              return $q.reject(response.data);
            }
          );
      };

      authService.setSessionData = function gInfo() {
        return $q.all([
          $http
            .get(URLS.QUARC_API + '/users/me')
            .then(function userinfoSuccess(response) {
              return Session.create('userinfo', response.data);
            }),

          $http
            .get(URLS.QUARC_API + '/users/states')
            .then(function statesSuccess(response) {
              return Session.create('states', response.data);
            }),
        ]);
      };

      return authService;
    });
