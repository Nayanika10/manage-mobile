'use strict';

describe('Controller: SearchCtrl', function () {

  // load the controller's module
  beforeEach(module('uiGenApp'));

  var SearchCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchCtrl = $controller('SearchCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
