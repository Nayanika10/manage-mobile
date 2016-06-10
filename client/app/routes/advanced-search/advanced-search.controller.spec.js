'use strict';

describe('Controller: AdvancedSearchCtrl', function () {

  // load the controller's module
  beforeEach(module('uiGenApp'));

  var AdvancedSearchCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdvancedSearchCtrl = $controller('AdvancedSearchCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
