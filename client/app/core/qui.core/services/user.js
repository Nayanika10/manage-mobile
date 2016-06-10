angular.module('qui.core')
  .factory('User', function Auth(Session) {
    const UserFactory = {
      userinfo: Session.read('userinfo'),
      states: Session.read('states'),
    };
    return UserFactory;
  });
