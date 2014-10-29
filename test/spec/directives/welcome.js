'use strict';

describe('Directive: welcome', function () {

  // load the directive's module
  beforeEach(module('dependencyQuizApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<welcome></welcome>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the welcome directive');
  }));
});
