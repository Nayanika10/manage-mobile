'use strict';
(function(){

function LoginComponent($scope,OAuth,$state,OAuthToken,Auth,Session) {
  var vm = this
  vm.user = {
    username: '',
    password: ''
  }
  vm.signin = function(user){
    var options = {}
    OAuth.getAccessToken(user, options).then(function(response){
      console.log(response)
      localStorage.access_token = response.data.access_token
      OAuthToken.setToken(response.data);
      Auth.setSessionData().then(function(){
        return $state.go('scoreboard')
      })
    }).catch(function(err){
      console.log("error while login",err);
      vm.authError = "Server Errro"
    });
  }
}

angular.module('uiGenApp')
  .component('login', {
    templateUrl: 'app/routes/login/login.html',
    controller: LoginComponent,
    controllerAs: 'Signin',
  });

})();
