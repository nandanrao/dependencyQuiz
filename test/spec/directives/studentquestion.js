'use strict';

describe('Directive: studentQuestion', function () {

  // load the directive's module
  beforeEach(module('dependencyQuizApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<student-question></student-question>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the studentQuestion directive');
  }));
});
