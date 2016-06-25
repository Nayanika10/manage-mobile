'use strict';
/**
 * angular-oauth2 - Angular OAuth2
 * @version v4.0.0
 * @link https://github.com/seegno/angular-oauth2
 * @license MIT
 */
angular.module("angular-oauth2", ['ngCookies']).config(oauthConfig).factory("oauthInterceptor", oauthInterceptor).provider("OAuth", OAuthProvider).provider("OAuthToken", OAuthTokenProvider);
function oauthConfig($httpProvider) {
  $httpProvider.interceptors.push("oauthInterceptor");
}
oauthConfig.$inject = [ "$httpProvider" ];
function oauthInterceptor($q, $rootScope, OAuthToken) {
  return {
    request: function request(config) {
      config.headers = config.headers || {};
      if (!config.headers.hasOwnProperty("Authorization") && OAuthToken.getAuthorizationHeader()) {
        config.headers.Authorization = OAuthToken.getAuthorizationHeader();
      }
      return config;
    },
    responseError: function responseError(rejection) {
      if (400 === rejection.status && rejection.data && ("invalid_request" === rejection.data.error || "invalid_grant" === rejection.data.error)) {
        OAuthToken.removeToken();
        $rootScope.$emit("oauth:error", rejection);
      }
      if (401 === rejection.status && rejection.data && "invalid_token" === rejection.data.error || rejection.headers("www-authenticate") && 0 === rejection.headers("www-authenticate").indexOf("Bearer")) {
        $rootScope.$emit("oauth:error", rejection);
      }
      return $q.reject(rejection);
    }
  };
}
oauthInterceptor.$inject = [ "$q", "$rootScope", "OAuthToken" ];
var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var defaults = {
  baseUrl: null,
  clientId: null,
  clientSecret: null,
  grantPath: "/oauth2/token",
  revokePath: "/oauth2/revoke"
};
var requiredKeys = [ "baseUrl", "clientId", "grantPath", "revokePath" ];
function OAuthProvider() {
  var config;
  this.configure = function(params) {
    if (config) {
      throw new Error("Already configured.");
    }
    if (!(params instanceof Object)) {
      throw new TypeError("Invalid argument: `config` must be an `Object`.");
    }
    config = angular.extend({}, defaults, params);
    angular.forEach(requiredKeys, function(key) {
      if (!config[key]) {
        throw new Error("Missing parameter: " + key + ".");
      }
    });
    if ("/" === config.baseUrl.substr(-1)) {
      config.baseUrl = config.baseUrl.slice(0, -1);
    }
    if ("/" !== config.grantPath[0]) {
      config.grantPath = "/" + config.grantPath;
    }
    if ("/" !== config.revokePath[0]) {
      config.revokePath = "/" + config.revokePath;
    }
    return config;
  };
  this.$get = function($http, OAuthToken) {
    var OAuth = function() {
      function OAuth() {
        _classCallCheck(this, OAuth);
        if (!config) {
          throw new Error("`OAuthProvider` must be configured first.");
        }
      }
      _createClass(OAuth, [ {
        key: "isAuthenticated",
        value: function isAuthenticated() {
          return !!OAuthToken.getToken();
        }
      }, {
        key: "getAccessToken",
        value: function getAccessToken(data, options) {
          data = angular.extend({
            client_id: config.clientId,
            grant_type: "password"
          }, data);
          if (null !== config.clientSecret) {
            data.client_secret = config.clientSecret;
          }
          data = queryString.stringify(data);
          options = angular.extend({
            headers: {
              Authorization: undefined,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }, options);
          return $http.post("" + config.baseUrl + config.grantPath, data, options).then(function(response) {
            OAuthToken.setToken(response.data);
            return response;
          });
        }
      }, {
        key: "getRefreshToken",
        value: function getRefreshToken(data, options) {
          data = angular.extend({
            client_id: config.clientId,
            grant_type: "refresh_token",
            refresh_token: OAuthToken.getRefreshToken()
          }, data);
          if (null !== config.clientSecret) {
            data.client_secret = config.clientSecret;
          }
          data = queryString.stringify(data);
          options = angular.extend({
            headers: {
              Authorization: undefined,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }, options);
          return $http.post("" + config.baseUrl + config.grantPath, data, options).then(function(response) {
            OAuthToken.setToken(response.data);
            return response;
          });
        }
      }, {
        key: "revokeToken",
        value: function revokeToken(data, options) {
          var refreshToken = OAuthToken.getRefreshToken();
          data = angular.extend({
            client_id: config.clientId,
            token: refreshToken ? refreshToken : OAuthToken.getAccessToken(),
            token_type_hint: refreshToken ? "refresh_token" : "access_token"
          }, data);
          if (null !== config.clientSecret) {
            data.client_secret = config.clientSecret;
          }
          data = queryString.stringify(data);
          options = angular.extend({
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }, options);
          return $http.post("" + config.baseUrl + config.revokePath, data, options).then(function(response) {
            OAuthToken.removeToken();
            return response;
          });
        }
      } ]);
      return OAuth;
    }();
    return new OAuth();
  };
  this.$get.$inject = [ "$http", "OAuthToken" ];
}
var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function OAuthTokenProvider() {
  var config = {
    name: "token",
    storage: sessionStorage,
    options: {
      secure: true
    }
  };
  this.configure = function(params) {
    if (!(params instanceof Object)) {
      throw new TypeError("Invalid argument: `config` must be an `Object`.");
    }
    angular.extend(config, params);
    return config;
  };
  this.$get = function($cookies) {
    var OAuthToken = function() {
      function OAuthToken() {
        _classCallCheck(this, OAuthToken);
      }
      _createClass(OAuthToken, [ {
        key: "setToken",
        value: function setToken(data) {
          return config.storage ? config.storage.setItem(config.name, JSON.stringify(data)) : $cookies.putObject(config.name, data, config.options);
        }
      }, {
        key: "getToken",
        value: function getToken() {
          return config.storage ? JSON.parse(config.storage.getItem(config.name)) : $cookies.getObject(config.name);
        }
      }, {
        key: "getAccessToken",
        value: function getAccessToken() {
          return this.getToken() ? this.getToken().access_token : undefined;
        }
      }, {
        key: "getAuthorizationHeader",
        value: function getAuthorizationHeader() {
          if (!(this.getTokenType() && this.getAccessToken())) {
            return;
          }
          return this.getTokenType().charAt(0).toUpperCase() + this.getTokenType().substr(1) + " " + this.getAccessToken();
        }
      }, {
        key: "getRefreshToken",
        value: function getRefreshToken() {
          return this.getToken() ? this.getToken().refresh_token : undefined;
        }
      }, {
        key: "getTokenType",
        value: function getTokenType() {
          return this.getToken() ? this.getToken().token_type : undefined;
        }
      }, {
        key: "removeToken",
        value: function removeToken() {
          console.log("removing token",config.name)
          return config.storage ? config.storage.removeItem(config.name) : $cookies.remove(config.name, config.options);
        }
      } ]);
      return OAuthToken;
    }();
    return new OAuthToken();
  };
  this.$get.$inject = [ "$cookies" ];
}

angular.module('qui.components', [])

angular
  .module('qui.core', [
    'qui.components',
    'http-auth-interceptor',
  ])
  .constant('MODULE_VERSION', '0.0.1')
  // this configs to initiated using provider



angular.module('uiGenApp', [
  'qui.core',
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'mwl.calendar',
  'chart.js',
  'restangular',
  'ngFileUpload',
  'angular-loading-bar',
  'easypiechart',
  'scrollable-table',
  'angularjs-dropdown-multiselect',
  'angular-oauth2'
])

  .config(function($urlRouterProvider, $locationProvider,RestangularProvider , OAuthProvider,OAuthTokenProvider) {
    OAuthTokenProvider.configure({
      name: 'token',
      options: {
        secure: false,
        path: '/'
      }
    });
    var OAUTH_URL, QUARC_API;
    if(location.hostname === ""){
      OAUTH_URL = 'https://qapi.quezx.com';
      QUARC_API = 'https://qapi.quezx.com/api'
    } else {
      OAUTH_URL = 'http://api.quezx.dev';
      QUARC_API = 'http://api.quezx.dev/api';
    }

    OAuthProvider.configure({
      baseUrl: OAUTH_URL,
      clientId: 'partnerquezx',
      clientSecret: '8755f9261f52ce1f67789a550c131cff', // optional
      grantPath: '/oauth/token',
    });

    RestangularProvider.setBaseUrl(QUARC_API); console.log(QUARC_API)
    $urlRouterProvider
      .otherwise('/search');


  }).run(function($rootScope,$window,OAuth, $state) {

  $rootScope.$on('oauth:error', function (event, rejection) {
    // Ignore `invalid_grant` error - should be catched on `LoginController`.
    if ('invalid_grant' === rejection.data.error) {
      return;
    }

    // Refresh token when a `invalid_token` error occurs.
    if ('invalid_token' === rejection.data.error) {
      return OAuth.getRefreshToken();
    }

    // Redirect to `/login` with the `error_reason`.
    return $state.go('login')
  });
})
.factory('QCONFIG', function(){
      return {ENV:'development',APPLICANT_STATES:['Tasks','Shortlisted','Feedback','Rejected','All'],MANAGE_JD_STATES:['New','Accepted','Hidden','Rejected','All']}
}).factory('URLS', function(){
  return {QUARC_API:'http://api.quezx.dev/api',OAUTH_URL:'http://api.quezx.dev',MANAGE_OAUTH_API:'http://api.quezx.dev/applications/manage/api',ACCOUNTS:'//accounts.quezx.dev',OAUTH:'//accounts.quezx.dev/authorise?client_id=managequezx&response_type=code&redirect_uri=http://manage.quezx.dev/access/oauth&state=yo',STACKTRACEJS:false}
})





