'use strict';

describe('Controller: SearchResultsCtrl', function () {

  // load the controller's module
  beforeEach(module('uiGenApp'));

  var SearchResultsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchResultsCtrl = $controller('SearchResultsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
