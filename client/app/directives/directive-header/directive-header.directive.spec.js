'use strict';

describe('Directive: directiveHeader', function () {

  // load the directive's module and view
  beforeEach(module('uiGenApp'));
  beforeEach(module('app/directives/directive-header/directive-header.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<directive-header></directive-header>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the directiveHeader directive');
  }));
});
