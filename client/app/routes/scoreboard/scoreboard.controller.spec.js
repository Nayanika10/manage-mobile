'use strict';

describe('Component: ScoreboardComponent', function () {

  // load the controller's module
  beforeEach(module('uiGenApp'));

  var ScoreboardComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ScoreboardComponent = $componentController('ScoreboardComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
